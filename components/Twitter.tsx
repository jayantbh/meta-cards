import React, { FC } from "react";
import Clamp from "react-multiline-clamp";
import { Meta } from "../utils/meta";

export const Twitter: FC<{ meta: Meta; url: string }> = (props) => {
  switch (props.meta.map["twitter:card"]) {
    case "summary_large_image":
      return <TwitterSummaryLargeImage {...props} />;
    case "summary":
      return <TwitterSummary {...props} />;
    default:
      return <div>Unable to render card preview</div>;
  }
};

const TwitterSummaryLargeImage: FC<{ meta: Meta; url: string }> = ({
  meta,
  url,
}) => (
  <div
    style={{
      width: `440px`,
      borderRadius: `0.86em`,
      border: `1px solid #8899a680`,
    }}
    className="overflow-hidden"
  >
    <div
      className="w-full"
      style={{
        backgroundImage: `url(${meta.image})`,
        aspectRatio: `2`,
        backgroundSize: `100%`,
        backgroundPosition: `center`,
      }}
    ></div>
    <div
      style={{
        fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        lineHeight: `1.3em`,
      }}
      className="text-sm"
    >
      <div
        style={{ gap: `0.33em` }}
        className="px-4 py-3 box-border flex flex-col"
      >
        <div className="font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">
          {meta.title}
        </div>
        <Clamp lines={2}>{meta.description}</Clamp>
        <div style={{ color: "#8899A6" }}>{new URL(url).hostname}</div>
      </div>
    </div>
  </div>
);

const TwitterSummary: FC<{ meta: Meta; url: string }> = ({ meta, url }) => (
  <div
    style={{
      width: `440px`,
      borderRadius: `0.86em`,
      border: `1px solid #8899a680`,
    }}
    className="flex overflow-hidden"
  >
    <img
      src={meta.image}
      style={{
        aspectRatio: `1`,
        width: `125px`,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
    <div
      style={{
        fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        lineHeight: `1.3em`,
      }}
      className="text-sm"
    >
      <div
        style={{ gap: `6px` }}
        className="px-4 py-3 box-border flex flex-col"
      >
        <div className="font-bold">{meta.title}</div>
        <Clamp lines={3}>{meta.description}</Clamp>
        <div style={{ color: "#8899A6" }}>{new URL(url).hostname}</div>
      </div>
    </div>
  </div>
);
