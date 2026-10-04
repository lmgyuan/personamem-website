# Publish the PersonaMem website

Yes—GitHub Pages can serve this website. It is static HTML, CSS, and JavaScript, so you do not need a server subscription, database, or API keys. GitHub Pages is available for public repositories on GitHub Free. You can add a custom domain later.

## Recommended: publish the complete project

1. On GitHub, create a public repository named `personamem-website` under your account or research organization. If you will use the terminal commands below, leave it empty (do not add an initial README).
2. Upload or push **this project folder’s contents**, including the hidden `.github` folder, to its `main` branch. GitHub Desktop is a convenient alternative to the terminal.
3. In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab and choose **Publish website to GitHub Pages → Run workflow → main → Run workflow**. If a push already triggered a failed run before Pages was enabled, rerun it now.
5. After the workflow succeeds, **Settings → Pages** shows the public address. A project repository named `personamem-website` normally appears at `https://YOUR-ACCOUNT.github.io/personamem-website/`.

The included workflow checks the data and uploads only `dist/`. Future pushes to `main` automatically republish the website. The relative asset paths work under a repository subdirectory.

### Optional terminal commands

Run these from the saved project folder. Replace `YOUR-ACCOUNT` with the GitHub user or organization that owns the new empty repository. These commands initialize only this new website project; they do not upload your whole workspace.

```sh
cd /Users/yuanyuan/workspace/personamem-website
git init -b main
git add .
git commit -m "Add PersonaMem research website"
git remote add origin https://github.com/YOUR-ACCOUNT/personamem-website.git
git push -u origin main
```

Authenticate with GitHub when prompted. Then follow steps 3–5 above. If publishing into an existing repository, use its existing branch and remote instead of running these initialization commands.

## Simplest browser-only alternative

If you prefer not to use Git or Actions:

1. Create a public repository.
2. Upload **the contents of `dist/`** directly into the repository’s root: `index.html`, `styles.css`, `data.js`, `app.js`, the `assets` folder, and `.nojekyll` if your file picker shows hidden files. Do not upload the enclosing `dist` folder for this option.
3. Open **Settings → Pages** and select **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Wait for the Pages deployment and open the address shown in Settings.

This alternative does not use the included workflow. Upload changed website files again when updating the site. Do not select `/(root)` for the full project layout: that layout’s `index.html` is inside `dist/` and should use the Actions method instead.

## Your own domain

After the default Pages URL works, buy or use a domain you control, add it under **Settings → Pages → Custom domain**, and configure its DNS according to GitHub’s current instructions. Turn on **Enforce HTTPS** when available. With the included Actions workflow, manage the domain in the repository’s Pages settings. A custom domain is optional; the default `github.io` URL is public and shareable.

## Before announcing

- Open the public URL on a phone and a desktop. Check release tabs, results, paper links, and citation downloads.
- Confirm author names and the intended paper versions with your collaborators. The included source notes explain the v3 engagement-count inconsistency and how this website handles it.
- If you want search engines and social networks to use one preferred URL, add a canonical link and `og:url` to `dist/index.html` after you know the final domain. The site already includes a title, description, social title/description, and favicon.

## Official GitHub instructions

- [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Use custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Manage a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Instructions checked October 3, 2026. No remote repository, public deployment, domain purchase, or DNS change has been made by creating these files.
