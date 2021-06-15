import React, { FC } from "react";
import { format } from "date-fns";
import { Meta } from "../utils/meta";

export const Slack: FC<{ meta: Meta; url: string }> = ({ meta, url }) => {
  const hasDataFields = Boolean(meta.dataFields);

  const isNotLargeCard =
    meta.map["twitter:card"] !== "summary_large_card" || hasDataFields;

  if (!meta.map["description"]) return <div>Unable to render card preview</div>;

  if (isNotLargeCard) return <SlackSummary meta={meta} url={url} />;

  return <SlackSummaryLargeImage meta={meta} url={url} />;
};

const SlackSummaryLargeImage: FC<{ meta: Meta; url: string }> = ({
  meta,
  url,
}) => {
  const image = meta.image;
  const date = meta.publishedDateReadable;

  const hasDataFields = Boolean(meta.dataFields);

  const isNotLargeCard =
    meta.map["twitter:card"] !== "summary_large_card" || hasDataFields;

  return (
    <div
      style={{
        width: `600px`,
        fontFamily: `Lato,appleLogo,sans-serif`,
        fontSize: `15px`,
      }}
      className="flex"
    >
      <div
        style={{
          backgroundColor: `rgb(221, 221, 221)`,
        }}
        className="w-1 rounded-full flex-shrink-0"
      />
      <div style={{ lineHeight: `22px` }} className="mx-3">
        <div className="flex items-center gap-x-2">
          <img src={meta.map["favicon"]} alt="favicon" className="h-4 w-4" />
          <div className="font-bold">{new URL(url).hostname}</div>
        </div>
        <div className="flex gap-x-3">
          <div style={{ flex: 4 }}>
            <div
              style={{
                color: `rgb(18, 100, 163)`,
              }}
              className="font-semibold"
            >
              {meta.title}
            </div>
            <div>
              <div>{meta.title}</div>
              {hasDataFields && (
                <div className="flex">
                  {meta.dataFields.map((field) => (
                    <div className="flex-grow">
                      <div className="font-semibold">{field.label}</div>
                      <div>{field.value}</div>
                    </div>
                  ))}
                </div>
              )}
              <div
                style={{
                  color: `rgb(97, 96, 97)`,
                }}
                className="text-xs pt-1"
              >
                {date}
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 3,
              boxShadow: `inset 0 0 0 1px rgb(0 0 0 / 10%)`,
              backgroundImage: `url(${image})`,
              backgroundSize: `100%`,
              height: `min-content`,
              maxWidth: isNotLargeCard ? "80px" : undefined,
            }}
            className="rounded overflow-hidden border border-gray-200"
          >
            <img src={image} alt="meta image" className="invisible" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SlackSummary: FC<{ meta: Meta; url: string }> = ({ meta, url }) => {
  const image = meta.image;
  const date = meta.publishedDateReadable;

  return (
    <div
      style={{
        width: `600px`,
        fontFamily: `Lato,appleLogo,sans-serif`,
        fontSize: `15px`,
      }}
      className="flex"
    >
      <div
        style={{
          backgroundColor: `rgb(221, 221, 221)`,
        }}
        className="w-1 rounded-full flex-shrink-0"
      />
      <div style={{ lineHeight: `22px` }} className="mx-3">
        <div className="flex items-center gap-x-2">
          <img src={meta.map["favicon"]} alt="favicon" className="h-4 w-4" />
          <div className="font-bold">{new URL(url).hostname}</div>
        </div>
        <div className="flex flex-col gap-x-3">
          <div
            style={{
              color: `rgb(18, 100, 163)`,
            }}
            className="font-semibold"
          >
            {meta.title}
          </div>
          <div>
            <div>{meta.description}</div>
            <div
              style={{
                color: `rgb(97, 96, 97)`,
              }}
              className="text-xs pt-1"
            >
              {date}
            </div>
          </div>
          {image && (
            <div
              style={{
                boxShadow: `inset 0 0 0 1px rgb(0 0 0 / 10%)`,
                backgroundImage: `url(${image})`,
                backgroundSize: `100%`,
                height: `min-content`,
                maxWidth: `360px`,
              }}
              className="rounded overflow-hidden border border-gray-200"
            >
              <img src={image} alt="meta image" className="invisible" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
