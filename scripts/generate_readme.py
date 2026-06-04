import os
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import quote

REPO_ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = REPO_ROOT / "_posts"
README_FILE = REPO_ROOT / "README.md"
SITE_URL = "https://lou-kaiqiang.github.io"

FRONT_MATTER_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.S)

def read_front_matter(content):
    match = FRONT_MATTER_RE.match(content)
    if match:
        lines = match.group(1).splitlines()
    else:
        lines = []
        for line in content.splitlines():
            if not line.strip():
                break
            lines.append(line)

    data = {}
    for line in lines:
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip("\"'")
    return data

def slugify(value):
    value = value.strip()
    value = re.sub(r"[^\w\u4e00-\u9fff+.'-]+", "-", value, flags=re.UNICODE)
    return value.strip("-")

def post_date(front_matter, fallback_date):
    date = front_matter.get("date", "")
    match = re.search(r"\d{4}-\d{2}-\d{2}", date)
    return match.group(0) if match else fallback_date

def post_url(date, slug):
    path = f"/{date.replace('-', '/')}/{slugify(slug)}/"
    encoded_path = quote(path, safe="/+.'-")
    return f"{SITE_URL}{encoded_path}"

def parse_post(filename, filepath):
    match = re.match(r"(\d{4}-\d{2}-\d{2})-(.+)\.md", filename)
    if not match:
        return None

    date, slug = match.groups()
    slug = slug.strip()
    title = slug.replace("-", " ")
    category = "未分类"

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        front_matter = read_front_matter(content)

        if front_matter.get("title"):
            title = front_matter["title"]

        if front_matter.get("categories"):
            category = front_matter["categories"].strip("[]").strip()

    date = post_date(front_matter, date)
    url = post_url(date, slug)

    return date, title, category, url

def main():
    categories = defaultdict(list)

    for root, _, files in os.walk(POSTS_DIR):
        for f in files:
            if f.endswith(".md"):
                filepath = Path(root) / f
                parsed = parse_post(f, filepath)
                if parsed:
                    date, title, category, url = parsed
                    categories[category].append((date, title, url))

    with open(README_FILE, "w", encoding="utf-8") as f:
        f.write("# 📚 博客文章目录\n\n")

        for cat in sorted(categories.keys()):
            f.write(f"## {cat}\n\n")
            f.write("| 日期 | 标题 |\n")
            f.write("|------|------|\n")

            posts = sorted(categories[cat], reverse=True)

            for date, title, url in posts:
                f.write(f"| {date} | [{title}]({url}) |\n")

            f.write("\n")

if __name__ == "__main__":
    main()
