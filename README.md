# Alcalde Lab at Penn State

The lab’s public website. The pages in `docs/` are standalone HTML and need no build step, framework, or paid hosting service.

## Editing the site

- Edit `docs/index.html` for the homepage and `docs/<page>/index.html` for other pages. The seven navigation links are repeated in the desktop and mobile header on each page.
- The homepage carousel’s slide data is in the JSON block near the bottom of the homepage; keep its initial slide in sync with the visible HTML.
- Shared styles and scripts are in `docs/assets/`. Only public, website-ready images and the public CV belong in this repository.
- In GitHub, choose **Settings → Pages → Deploy from a branch → main → /docs**. Internal links are relative and work on both the GitHub project URL and a custom domain.

## Cloudflare Web Analytics

Register `alcaldelab.org` under Cloudflare **Web Analytics → Add a site**. From the site's JavaScript snippet, copy the public beacon token into `siteToken` in `docs/assets/analytics.js`. Do **not** use an API token or account credentials. The shared script is included on every page. It sends no data until configured, and excludes previews, localhost, and the GitHub Pages test hostname. On the live custom domain, check the browser Network tab for the Cloudflare beacon and confirm a visit reaches the Cloudflare dashboard.
