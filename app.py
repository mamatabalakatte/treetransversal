import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

# Configuration
GITHUB_USER = "mamatabalakatte"
GITHUB_REPO = "treetransversal"
BRANCH = "main"
DIST_PATH = Path("dist/tree")

st.set_page_config(page_title="Tree Traversal Visualizer (Streamlit)")

st.title("Tree Traversal Visualizer")

if not DIST_PATH.exists():
    st.error(f"Missing {DIST_PATH}. Run ./build_dist.sh locally and commit/push the files to your repo.")
    st.stop()

# Read HTML and JS
index_html = (DIST_PATH / "index.html").read_text(encoding="utf-8")
script_js = (DIST_PATH / "js" / "script.js").read_text(encoding="utf-8")

# Point the WASM glue to the raw GitHub URL so it can be fetched from the cloud
raw_wasm_js = f"https://raw.githubusercontent.com/{GITHUB_USER}/{GITHUB_REPO}/{BRANCH}/dist/tree/wasm/tree.js"

# Replace local import with absolute raw URL
script_js = script_js.replace("import createModule from \"../wasm/tree.js\";", f"import createModule from \"{raw_wasm_js}\";")

# Inline the modified script into the HTML
inlined_html = index_html.replace('<script type="module" src="js/script.js"></script>', f'<script type="module">\n{script_js}\n</script>')

components.html(inlined_html, height=800, scrolling=True)
