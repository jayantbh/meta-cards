import React, { FC } from "react";
import Clamp from "react-multiline-clamp";
import { MetaMap } from "../types";

export const Discord: FC<{ meta: MetaMap; url: string }> = (props) => {
  if (!props.meta["description"])
    return <div>Unable to render card preview</div>;

  switch (props.meta["twitter:card"]) {
    case "summary_large_image":
      return <DiscordSummaryLargeImage {...props} />;
    default:
      return <DiscordSummary {...props} />;
  }
};

const DiscordSummaryLargeImage: FC<{ meta: MetaMap; url: string }> = ({
  meta,
  url,
}) => (
  <div
    style={{
      fontFamily: `"discord", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      width: `440px`,
      borderLeft: `4px solid`,
      borderLeftColor: meta["theme-color"] || `rgb(227, 229, 232)`,
      padding: `8px 16px 16px 12px`,
      backgroundColor: `#f2f3f5`,
    }}
    className="overflow-hidden rounded relative"
  >
    <div
      style={{
        lineHeight: `1.3em`,
      }}
      className="text-sm"
    >
      <div style={{ gap: `0.33em` }} className="box-border flex flex-col">
        <div className="text-xs mt-2">{meta["og:site_name"]}</div>
        <div
          className="font-semibold text-base"
          style={{
            color: `rgb(0, 104, 224)`,
          }}
        >
          {meta["twitter:title"]}
        </div>
        <Clamp lines={3}>{meta["twitter:description"]}</Clamp>
      </div>
    </div>
    <img
      src={meta["twitter:image"] || meta["og:image"]}
      style={{
        objectFit: "cover",
        flexShrink: 0,
      }}
      className="rounded mt-4"
    />
  </div>
);

const DiscordSummary: FC<{ meta: MetaMap; url: string }> = ({ meta, url }) => (
  <div
    style={{
      fontFamily: `"discord", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      width: `max-content`,
      maxWidth: `500px`,
      borderLeft: `4px solid`,
      borderLeftColor: meta["theme-color"],
      padding: `8px 16px 16px 12px`,
      backgroundColor: `#f2f3f5`,
    }}
    className="overflow-hidden rounded relative flex"
  >
    <div
      style={{
        lineHeight: `1.3em`,
      }}
      className="text-sm"
    >
      <div style={{ gap: `0.33em` }} className="box-border flex flex-col">
        <div className="text-xs mt-2">{meta["og:site_name"]}</div>
        <div
          className="font-semibold text-base"
          style={{
            color: `rgb(0, 104, 224)`,
          }}
        >
          {meta["twitter:title"] || meta["og:title"]}
        </div>
        <Clamp lines={3}>
          {meta["twitter:description"] || meta["og:description"] || ""}
        </Clamp>
      </div>
    </div>
    <img
      src={meta["twitter:image"] || meta["og:image"]}
      style={{
        flexShrink: 0,
        height: "fit-content",
      }}
      className="rounded mt-2 w-20 ml-4"
    />
  </div>
);
