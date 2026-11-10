// Cloudflare Web Analytics: use only the PUBLIC site token from its JS snippet.
// No requests are sent until the token is set and the production domain is live.
(() => {
  const siteToken = "5e324fbdfbf2437cbcfe7a4f43482f66";
  if (!/^[a-f0-9]{32}$/i.test(siteToken)) return;
  if (!["alcaldelab.org", "www.alcaldelab.org"].includes(location.hostname)) return;
  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.dataset.cfBeacon = JSON.stringify({ token: siteToken });
  document.head.appendChild(beacon);
})();
