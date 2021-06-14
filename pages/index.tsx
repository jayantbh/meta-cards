import Head from "next/head";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { Discord } from "../components/Discord";
import { LinkedIn } from "../components/LinkedIn";
import { Slack } from "../components/Slack";
import { Twitter } from "../components/Twitter";
import { MetaMap } from "../types";

import { request } from "../utils/request";

// https://www.npmjs.com/package/react-clamp-lines | NO IMAGE
// https://jayant.dev/blog/framer-motion-essentials/ | LARGE IMAGE + AUTHOR + DATA FIELDS

const PRESET_URLS = [
  "https://www.npmjs.com/package/react-clamp-lines",
  "https://jayant.dev/blog/framer-motion-essentials",
  "https://www.npmjs.com/package/rr-table",
  "http://jayant.tech/experiments/flip-animation-technique",
  "https://date-fns.org/v2.22.1/docs/format/",
  "https://fonts.google.com/specimen/Lato?query=lato",
];
export default function Home() {
  const [meta, setMeta] = useState<MetaMap>({});
  const [_url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const url = useMemo(() => {
    try {
      return new URL(_url).href;
    } catch {
      return "";
    }
  }, [_url]);

  const fetchMeta = useCallback(
    async (url: string) => {
      if (loading) return;
      setLoading(true);
      try {
        const { body: tuples } = await request("/api/get-meta?url=" + url);
        console.log(typeof tuples, tuples);
        const metaMap = Object.fromEntries(tuples);
        setMeta(metaMap);
      } catch {}

      setLoading(false);
    },
    [loading]
  );

  const metaList = [...Object.entries(meta)];

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-rose-400 via-fuchsia-500 to-indigo-500 overflow-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent">
      <div className="flex justify-center items-center min-h-full">
        <div className="container px-12 flex flex-col items-center justify-center h-full">
          <h1 className="self-start text-7xl text-white leading-relaxed">
            META CARDS (ALPHA)
          </h1>

          <div className="flex gap-3 flex-wrap leading-none">
            {PRESET_URLS.map((link) => (
              <div
                key={link}
                className="px-2 py-1 bg-rose-200 hover:bg-rose-300 select-none cursor-pointer transition-colors"
                onClick={() => {
                  setUrl(link);
                  fetchMeta(link);
                }}
              >
                {link}
              </div>
            ))}
          </div>

          <form
            className="py-3 w-full flex"
            onSubmit={(e) => {
              e.preventDefault();
              fetchMeta(url);
            }}
          >
            <button
              className={cn("px-4 py-2 w-20", {
                "bg-rose-300": !!url.length && !loading,
                "bg-gray-200 text-gray-500": !url.length || loading,
              })}
              disabled={!url.length}
            >
              {loading ? "LOADING" : "FETCH"}
            </button>
            <input
              type="text"
              className="w-full py-1 px-2"
              placeholder="type a url to fetch meta data for"
              value={_url}
              onInput={(e) => setUrl(e.currentTarget.value)}
            />
          </form>

          <div className="w-full flex gap-x-3 justify-center card-container">
            {!!loading && (
              <div className="flex gap-2">
                <div className="h-2 w-2 animate-ping bg-indigo-700 rounded-full" />
                <div className="h-2 w-2 animate-ping bg-indigo-700 rounded-full" />
                <div className="h-2 w-2 animate-ping bg-indigo-700 rounded-full" />
              </div>
            )}
            {!!url && !loading && (
              <div className="flex gap-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent pb-3">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="text-2xl mb-3">Twitter</div>
                  <Twitter meta={meta} url={url} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="text-2xl mb-3">LinkedIn</div>
                  <LinkedIn meta={meta} url={url} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="text-2xl mb-3">Slack</div>
                  <Slack meta={meta} url={url} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="text-2xl mb-3">Discord</div>
                  <Discord meta={meta} url={url} />
                </div>
              </div>
            )}
          </div>

          {metaList.length > 0 && (
            <div className="py-12 w-full">
              <h2 className="self-start text-5xl text-white leading-relaxed">
                META TAGS ({metaList.length})
              </h2>
              <table>
                {metaList.map(([name, value]) => (
                  <tr key={name} className="align-text-top">
                    <td
                      className={cn("text-white text-right px-2", {
                        "text-cyan-100 bg-cyan-600 font-light":
                          name.includes("twitter:"),
                        "text-indigo-100 bg-indigo-600 font-light":
                          name.includes("og:"),
                        "text-white bg-black font-light":
                          name.includes("apple"),
                      })}
                    >
                      {name}
                    </td>
                    <td className="text-indigo-900 pl-2">{value}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
