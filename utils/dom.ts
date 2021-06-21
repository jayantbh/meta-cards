export const safeHTML = (html?: string) =>
  html
    ? new DOMParser()
        .parseFromString(html, "text/html")
        .body.textContent?.replace(/(\n\n)\n+/gm, "$1")
    : "";
