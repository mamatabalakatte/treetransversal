import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

# Configuration
GITHUB_USER = "mamatabalakatte"
GITHUB_REPO = "treetransversal"
BRANCH = "main"
ROOT_DIR = Path(__file__).resolve().parent
SITE_DIR = ROOT_DIR / "Tree-Traversal-Visualizer"

st.set_page_config(page_title="Tree Traversal Visualizer (Streamlit)")

st.title("Tree Traversal Visualizer")

if not SITE_DIR.exists():
    st.error(f"Missing source folder: {SITE_DIR}")
    st.stop()

# Read HTML and JS from the source folder
index_html = (SITE_DIR / "index.html").read_text(encoding="utf-8")
script_js = (SITE_DIR / "js" / "script.js").read_text(encoding="utf-8")

# Point the WASM glue to the raw GitHub URL so it can be fetched from the cloud
raw_wasm_js = f"https://raw.githubusercontent.com/{GITHUB_USER}/{GITHUB_REPO}/{BRANCH}/Tree-Traversal-Visualizer/wasm/tree.js"

# Replace local import with an absolute raw URL
script_js = script_js.replace("import createModule from \"../wasm/tree.js\";", f"import createModule from \"{raw_wasm_js}\";")

# Inline the modified script into the HTML
inlined_html = index_html.replace('<script type="module" src="js/script.js"></script>', f'<script type="module">\n{script_js}\n</script>')

components.html(inlined_html, height=900, scrolling=True)
