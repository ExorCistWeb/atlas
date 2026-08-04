#!/usr/bin/env python3
"""Import one public SdamGIA variant into a local, frontend-friendly JSON file.

The importer keeps task illustrations in the project so the training screen does
not depend on the source website at runtime. Mathematical formula images are
converted to their accessible text alternative.
"""

from __future__ import annotations

import argparse
import copy
import gzip
import json
import re
import time
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen

from lxml import etree, html


SOURCE_ROOT = "https://ege.sdamgia.ru"
DEFAULT_VARIANT_ID = "89892516"
DEFAULT_PROBLEM_IDS = [
    697335, 697336, 697337, 697338, 697339, 697340, 697341,
    697342, 697343, 697344, 697345, 697346, 697347, 697348,
    697420, 697350, 697351, 697352, 697353,
]
TOPICS = [
    "Планиметрия · Треугольники",
    "Векторы",
    "Стереометрия · Комбинации тел",
    "Вероятности · Теоремы",
    "Вероятности · Комбинаторика",
    "Уравнения · Иррациональные",
    "Вычисления · Иррациональные выражения",
    "Производная · Исследование функций",
    "Прикладная задача · Формулы",
    "Текстовая задача · Проценты и смеси",
    "Графики функций · Парабола",
    "Исследование функций · Максимум",
    "Тригонометрические уравнения",
    "Стереометрия · Расстояние до плоскости",
    "Неравенства · Логарифмы",
    "Финансовая математика · Кредиты",
    "Планиметрия · Доказательство",
    "Задача с параметром",
    "Числа и их свойства",
]


def fetch(url: str, referer: str | None = None) -> tuple[bytes, str]:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; StedyContentImporter/1.0)",
        "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,image/svg+xml,image/*,*/*;q=0.8",
    }
    if referer:
        headers["Referer"] = referer
    request = Request(url, headers=headers)
    with urlopen(request, timeout=40) as response:
        payload = response.read()
        if payload.startswith(b"\x1f\x8b"):
            payload = gzip.decompress(payload)
        return payload, response.headers.get_content_type()


def normalize_text(value: str) -> str:
    value = value.replace("\u00ad", "").replace("\xa0", " ").replace("\u202f", " ")
    return re.sub(r"\s+", " ", value).strip()


def inner_html(node: html.HtmlElement) -> str:
    chunks: list[str] = []
    if node.text and node.text.strip():
        chunks.append(node.text)
    for child in node:
        chunks.append(etree.tostring(child, encoding="unicode", method="html"))
    return normalize_markup("".join(chunks))


def normalize_markup(value: str) -> str:
    value = value.replace("\u00ad", "").replace("\xa0", " ").replace("\u202f", " ")
    value = re.sub(r">\s+<", "><", value)
    return value.strip()


def safe_extension(content_type: str, payload: bytes) -> str:
    if "svg" in content_type or payload.lstrip().startswith(b"<?xml") or b"<svg" in payload[:500]:
        return ".svg"
    if "png" in content_type or payload.startswith(b"\x89PNG"):
        return ".png"
    if "webp" in content_type or payload.startswith(b"RIFF"):
        return ".webp"
    return ".jpg"


def clean_fragment(
    original: html.HtmlElement,
    *,
    task_number: int,
    kind: str,
    assets_dir: Path,
    public_assets_dir: str,
    referer: str,
) -> tuple[str, str, list[str]]:
    node = copy.deepcopy(original)
    downloaded: list[str] = []

    for unwanted in node.xpath(".//script|.//style|.//button|.//input"):
        unwanted.getparent().remove(unwanted)

    for link in node.xpath(".//a"):
        link.drop_tag()

    image_index = 0
    formula_index = 0
    for image in list(node.xpath(".//img")):
        source = image.get("src", "")
        classes = set((image.get("class") or "").split())
        if "tex" in classes or "/formula/" in source:
            if kind != "question":
                formula = etree.Element("span")
                formula.set("class", "task-formula")
                formula.text = normalize_text(image.get("alt") or "формула")
                formula.tail = image.tail
                image.getparent().replace(image, formula)
                continue
            formula_index += 1
            absolute_url = urljoin(SOURCE_ROOT, source)
            payload, content_type = fetch(absolute_url, referer=referer)
            extension = safe_extension(content_type, payload)
            filename = f"task-{task_number:02d}-{kind}-formula-{formula_index:02d}{extension}"
            destination = assets_dir / filename
            destination.write_bytes(payload)
            image.set("src", f"{public_assets_dir}/{filename}")
            image.set("class", "task-formula-image")
            image.set("alt", normalize_text(image.get("alt") or "Математическая формула"))
            continue

        if "/get_file" in source:
            image_index += 1
            absolute_url = urljoin(SOURCE_ROOT, source)
            payload, content_type = fetch(absolute_url, referer=referer)
            extension = safe_extension(content_type, payload)
            filename = f"task-{task_number:02d}-{kind}-{image_index:02d}{extension}"
            destination = assets_dir / filename
            destination.write_bytes(payload)
            public_path = f"{public_assets_dir}/{filename}"
            image.set("src", public_path)
            image.set("alt", image.get("alt") or f"Иллюстрация к заданию {task_number}")
            downloaded.append(public_path)

    allowed_attributes = {"src", "alt", "class", "colspan", "rowspan"}
    for element in node.iter():
        for attribute in list(element.attrib):
            if attribute not in allowed_attributes:
                del element.attrib[attribute]
        if element.tag == "img" and "task-formula-image" not in (element.get("class") or ""):
            element.set("class", "task-illustration")

    text = normalize_text(" ".join(node.itertext()))
    return inner_html(node), text, downloaded


def extract_answer(root: html.HtmlElement) -> str | None:
    blocks = root.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), ' answer ')]")
    if not blocks:
        return None
    value = normalize_text(" ".join(blocks[0].itertext()))
    value = re.sub(r"^Ответ:\s*", "", value, flags=re.IGNORECASE)
    return value.rstrip(".").strip() or None


def parse_problem(
    problem_id: int,
    task_number: int,
    assets_dir: Path,
    public_assets_dir: str,
) -> dict:
    url = f"{SOURCE_ROOT}/problem?id={problem_id}"
    payload, _ = fetch(url)
    root = html.fromstring(payload)
    bodies = root.xpath("//div[starts-with(@id, 'body') and contains(concat(' ', normalize-space(@class), ' '), ' pbody ')]")
    solutions = root.xpath("//div[starts-with(@id, 'sol') and contains(concat(' ', normalize-space(@class), ' '), ' solution ')]")
    if not bodies:
        raise RuntimeError(f"Task {problem_id}: question body was not found")

    question_html, question_text, question_images = clean_fragment(
        bodies[0],
        task_number=task_number,
        kind="question",
        assets_dir=assets_dir,
        public_assets_dir=public_assets_dir,
        referer=url,
    )

    solution_html = ""
    solution_text = ""
    solution_images: list[str] = []
    if solutions:
        solution_html, solution_text, solution_images = clean_fragment(
            solutions[0],
            task_number=task_number,
            kind="solution",
            assets_dir=assets_dir,
            public_assets_dir=public_assets_dir,
            referer=url,
        )
        solution_text = re.sub(r"^Ре[­\s]*ше[­\s]*ние\.\s*", "", solution_text, flags=re.IGNORECASE)

    answer_type = "short" if task_number <= 12 else "extended"
    short_answer = extract_answer(root) if answer_type == "short" else None
    answer = short_answer or solution_text
    if not answer:
        raise RuntimeError(f"Task {problem_id}: answer or solution was not found")

    return {
        "number": task_number,
        "id": str(problem_id),
        "type": answer_type,
        "part": 1 if answer_type == "short" else 2,
        "topic": TOPICS[task_number - 1],
        "question": question_text,
        "question_html": question_html,
        "answer": answer,
        "short_answer": short_answer,
        "solution": solution_text,
        "solution_html": solution_html,
        "image": question_images[0] if question_images else None,
        "images": question_images,
        "solution_images": solution_images,
        "source_url": url,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--variant-id", default=DEFAULT_VARIANT_ID)
    parser.add_argument("--output", type=Path, default=Path("data/ege-89892516.json"))
    parser.add_argument("--assets-dir", type=Path, default=Path("assets/tasks/89892516"))
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.assets_dir.mkdir(parents=True, exist_ok=True)
    public_assets_dir = args.assets_dir.as_posix()

    tasks = []
    for number, problem_id in enumerate(DEFAULT_PROBLEM_IDS, start=1):
        print(f"[{number:02d}/19] importing {problem_id}", flush=True)
        tasks.append(parse_problem(problem_id, number, args.assets_dir, public_assets_dir))
        time.sleep(0.15)

    document = {
        "id": args.variant_id,
        "title": "ЕГЭ по математике 27.03.2026 · Досрочная волна · Вариант 1",
        "subject": "Профильная математика",
        "source": {
            "name": "РЕШУ ЕГЭ",
            "url": f"{SOURCE_ROOT}/test?id={args.variant_id}",
            "copyright": "© Гущин Д. Д., 2011–2026",
        },
        "task_count": len(tasks),
        "short_answer_count": sum(task["type"] == "short" for task in tasks),
        "extended_answer_count": sum(task["type"] == "extended" for task in tasks),
        "tasks": tasks,
    }
    args.output.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"saved {args.output} ({len(tasks)} tasks)")


if __name__ == "__main__":
    main()
