import { format } from "date-fns";

import { OEmbed } from "../pages/api/get-meta";
import { DataField, MetaMap } from "../types";

export class Meta {
  map: MetaMap;
  oEmbed?: OEmbed;

  constructor(metaMap: MetaMap, oEmbed?: OEmbed) {
    this.map = metaMap;
    this.oEmbed = oEmbed;
  }

  public get entries() {
    return Object.entries(this.map);
  }

  public get oEmbedEntries(): [string, string | number | undefined][] {
    return Object.entries(this.oEmbed || {});
  }

  public get title(): string {
    return (
      this.oEmbed?.title ||
      this.map["twitter:title"] ||
      this.map["twitter:text:title"] ||
      this.map["og:title"] ||
      this.map.title ||
      ""
    );
  }

  public get description(): string {
    return (
      this.map["twitter:description"] ||
      this.map["og:description"] ||
      this.map.description ||
      ""
    );
  }

  public get dataFields(): DataField[] {
    let fields: DataField[] = [];
    if (this.map["twitter:label1"]) {
      fields.push({
        label: this.map["twitter:label1"],
        value: this.map["twitter:data1"] || "",
      });
    }
    if (this.map["twitter:label2"]) {
      fields.push({
        label: this.map["twitter:label2"],
        value: this.map["twitter:data2"] || "",
      });
    }

    return fields;
  }

  public get image(): string {
    return (
      this.map["og:image"] ||
      this.map["twitter:image"] ||
      this.map["twitter:image:src"] ||
      ""
    );
  }

  public get publishedDate(): string {
    return (
      this.map["article:published_time"] ||
      this.map.publish_date ||
      this.map.date ||
      this.map["article:modified_time"] ||
      this.map.search_date ||
      ""
    );
  }

  public get publishedDateReadable(): string | null {
    return this.publishedDate
      ? format(new Date(this.publishedDate), "MMM do, yyyy")
      : null;
  }

  public get author(): string {
    return (
      this.oEmbed?.author_name ||
      this.oEmbed?.author_name ||
      this.map.author ||
      ""
    );
  }
}
