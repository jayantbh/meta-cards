import { useEffect } from "react";
import { getURLFromParams } from "../utils/location";

export const useHistoryChange = (listener: (e: PopStateEvent) => any) => {
  useEffect(() => {
    window.addEventListener("popstate", listener);
    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, [listener]);
};
