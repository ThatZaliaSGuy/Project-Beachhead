# Beachhead website

The public showcase page for Beachhead – Eras of Conquest: one static page (`index.html`,
`assets/site.css`, `assets/site.js`), no build step.

This is deliberately a separate repository from the engine. It carries in-engine screenshots of
original game content, which the engine repository must never contain.

## Preview locally

```
python -m http.server 8742 --directory .
```

Then open http://localhost:8742.

## Publish on GitHub Pages

1. Create an empty GitHub repository (for example `beachhead-site`, or `<user>.github.io` for a
   root URL).
2. `git remote add origin https://github.com/<user>/<repo>.git` and `git push -u origin main`.
3. In the repository's Settings > Pages, choose "Deploy from a branch", branch `main`, folder `/`.

`.nojekyll` makes Pages serve the files as they are.

## Images

`assets/img/` holds WebP copies of the showcase renders (1920 px plus 720 px thumbnails) and
`assets/brand/` the title wordmarks cut from the workspace's `Beachhead_titles-transparent.png`
(`scratch/site_images.py`, `scratch/site_images2.py`). The sheet's fourth wordmark still reads
FUTURE WAR, so the Cold Front card shows its BEACHHEAD mark with a COLD FRONT line drawn in CSS
until the sheet is updated. Operation Irving's newer shots come from the owner's Pictures folder,
cropped evenly on both sides to drop the debug panel in their top-right corner.
