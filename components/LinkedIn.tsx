import React, { FC } from "react";
import { MetaMap } from "../types";

export const LinkedIn: FC<{ meta: MetaMap; url: string }> = ({ meta, url }) => {
  const image = meta["twitter:image"] || meta["og:image"];
  return (
    <div
      style={{
        width: `520px`,
        borderRadius: `2px`,
        boxShadow: `0 0 0 1px rgb(0 0 0 / 15%), 0 2px 3px rgb(0 0 0 / 20%), 0 0 0.5px 0 #8899a680`,
        color: `rgba(0,0,0,.9)`,
      }}
    >
      {!!image && (
        <div
          className="w-full"
          style={{
            backgroundImage: `url(${image})`,
            aspectRatio: `1.9`,
            backgroundSize: `100%`,
            backgroundPosition: `center`,
          }}
        />
      )}
      <div
        style={{
          fontFamily: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Fira Sans",Ubuntu,Oxygen,"Oxygen Sans",Cantarell,"Droid Sans","Apple Color Emoji","Segoe UI Emoji","Segoe UI Emoji","Segoe UI Symbol","Lucida Grande",Helvetica,Arial,sans-serif`,
          lineHeight: `1.5`,
        }}
      >
        <div
          style={{ gap: `0.25em`, padding: `10px` }}
          className="box-border flex flex-col"
        >
          <div className="text-base font-semibold overflow-ellipsis whitespace-nowrap overflow-hidden">
            {meta["twitter:title"] || meta["title"]}
          </div>
          <div
            style={{
              fontSize: `12px`,
              color: `#0009`,
            }}
          >
            {new URL(url).hostname}
          </div>
        </div>
      </div>
    </div>
  );
};
