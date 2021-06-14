// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

import { request } from "../../utils/request";

type MetaTuple = [string | undefined, string | undefined];

type Data = {
  body: MetaTuple[];
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await request(req.query.url as string);

  const body = parse(response);
  const metas = [...body.querySelectorAll("meta")]
    .map<MetaTuple>((el) => [
      el.getAttribute("name") || el.getAttribute("property"),
      el.getAttribute("content"),
    ])
    .filter(([name]) => !!name?.length);

  const title = body.querySelector("title").rawText;
  metas.push(["title", title]);

  const faviconHref = body
    .querySelector("link[rel=icon]")
    ?.getAttribute("href");
  if (faviconHref) {
    const favicon = new URL(faviconHref || "", req.query.url as string).href;
    metas.push(["favicon", favicon]);
  }

  res.status(200).json({ body: metas });
};
