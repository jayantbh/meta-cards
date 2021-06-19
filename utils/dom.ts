export const safeHTML = (html: string) =>
  new DOMParser()
    .parseFromString(html, "text/html")
    .body.textContent?.replace(/(\n\n)\n+/gm, "$1");
