import React, { FC } from "react";
import Clamp from "react-multiline-clamp";
import { Meta } from "../utils/meta";

export const Discord: FC<{ meta: Meta; url: string }> = (props) => {
  // The twitter title check seems to be the only thing preventing a card from rendering
  if (!props.meta.description && !props.meta.map["twitter:title"])
    return <div>Unable to render card preview</div>;

  switch (props.meta.map["twitter:card"]) {
    case "summary_large_image":
      return <DiscordSummaryLargeImage {...props} />;
    default:
      return <DiscordSummary {...props} />;
  }
};

const DiscordSummaryLargeImage: FC<{ meta: Meta; url: string }> = ({
  meta,
  url,
}) => (
  <div
    style={{
      fontFamily: `"discord", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      width: `440px`,
      borderLeft: `4px solid`,
      borderLeftColor: meta.map["theme-color"] || `rgb(227, 229, 232)`,
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
      <div style={{ gap: `0.5em` }} className="box-border flex flex-col">
        <div className="text-xs mt-2 empty:hidden">
          {meta.map["og:site_name"]}
        </div>
        <div className="font-semibold empty:hidden">{meta.map.rel_author}</div>
        <div
          className="font-semibold text-base"
          style={{
            color: `rgb(0, 104, 224)`,
          }}
        >
          {meta.title}
        </div>
        <Clamp lines={3}>{meta.description}</Clamp>
      </div>
    </div>
    {meta.image && (
      <img
        src={meta.image}
        style={{
          objectFit: "cover",
          flexShrink: 0,
        }}
        className="rounded mt-4"
      />
    )}
  </div>
);

const DiscordSummary: FC<{ meta: Meta; url: string }> = ({ meta, url }) => (
  <div
    style={{
      fontFamily: `"discord", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      width: `max-content`,
      maxWidth: `500px`,
      borderLeft: `4px solid`,
      borderLeftColor: meta.map["theme-color"],
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
        <div className="text-xs mt-2 empty:hidden">
          {meta.map["og:site_name"]}
        </div>
        <div
          className="font-semibold text-base"
          style={{
            color: `rgb(0, 104, 224)`,
          }}
        >
          {meta.title}
        </div>
        <Clamp lines={3}>{meta.description}</Clamp>
      </div>
    </div>
    {meta.image && (
      <img
        src={meta.image}
        style={{
          flexShrink: 0,
          height: "fit-content",
        }}
        className="rounded mt-2 w-20 ml-4"
      />
    )}
  </div>
);
