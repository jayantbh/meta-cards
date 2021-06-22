export const getURLFromParams = () => {
  if (typeof window === "undefined") return "";

  const params = new URL(window.location.href).searchParams;
  return params.get("url") || "";
};

export const setURLInParams = (param: string) => {
  const url = new URL(window.location.href);
  if (param.length) {
    url.searchParams.set("url", param);
  } else {
    url.searchParams.delete("url");
  }
  window.history.pushState({}, "", url.href);
};
