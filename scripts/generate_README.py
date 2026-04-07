import os
import re
from collections import defaultdict

POSTS_DIR = "_posts"
README_FILE = "README.md"

def parse_post(filename, filepath):
    match = re.match(r"(\d{4}-\d{2}-\d{2})-(.+)\.md", filename)
    if not match:
        return None

    date, slug = match.groups()
    title = slug.replace("-", " ")
    category = "未分类"

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

        t = re.search(r"title:\s*\"?(.*?)\"?\n", content)
        if t:
            title = t.group(1)

        c = re.search(r"categories:\s*\[?(.*?)\]?\n", content)
        if c:
            category = c.group(1).strip()

    url = f"https://lou-kaiqiang.github.io/{date.replace('-', '/')}/{slug}/"

    return date, title, category, url

def main():
    categories = defaultdict(list)

    for root, _, files in os.walk(POSTS_DIR):
        for f in files:
            if f.endswith(".md"):
                filepath = os.path.join(root, f)
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