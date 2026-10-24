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
`assets/brand/` the painted era logos, made from the originals in the workspace's
`progress/showcase` and `progress/branding` folders by `scratch/site_images.py`. The Cold Front
card uses a type-only wordmark until its logo exists.
