Deployment options for `tree` (live site)

This document explains three easy ways to publish the `Tree-Traversal-Visualizer` folder as a live static site named `tree`.

1) GitHub Pages (recommended)
- Create a GitHub repository named `tree` under your account.
- From your local project root run:

```bash
cd "Tree-Traversal-Visualizer"
git init
git remote add origin git@github.com:<your-username>/tree.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

- On GitHub, go to Settings → Pages and set source to `main` branch, `/ (root)` folder. Save.
- Your site will be available at `https://<your-username>.github.io/tree/` within a few minutes.

Notes: GitHub Pages serves static files including `.wasm`. If you want the repository itself to be named `tree` (so the path is `/tree/`) then follow the steps above.

2) Netlify
- Create a Netlify account and site, and drag-and-drop the `Tree-Traversal-Visualizer` folder into Netlify Drop, or connect your GitHub repo.
- Netlify will provide a random site name; you can change the subdomain to `tree-<random>` or set a custom domain.

3) Surge (simple CLI)
- Install Surge: `npm i -g surge`
- From project root:

```bash
cd "Tree-Traversal-Visualizer"
surge . tree.surge.sh
```

This publishes the folder at `https://tree.surge.sh` (if available).

Helper scripts in this repo
- `build_dist.sh` — copies the project into `dist/tree` ready for deployment.
- `gh_pages_deploy.sh` — helper that uses `ghp-import` (if installed) to push the `dist/tree` folder to `gh-pages` branch.

If you want, I can prepare and run the git commands for you, but I'll need your GitHub repo access or you can run the final push locally.
