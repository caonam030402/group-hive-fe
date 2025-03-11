import { EListDocsHub } from "@/enums/docsHub";

import { iconPath } from "./icons";

export const listDocsHub = [
  {
    key: EListDocsHub.DOC,
    title: "New Docs",
    icon: iconPath.doc,
  },
  {
    key: EListDocsHub.SHEET,
    title: "New Sheet",
    icon: iconPath.sheet,
  },
  {
    key: EListDocsHub.SLIDE,
    title: "New Slide",
    icon: iconPath.slide,
  },
  {
    key: EListDocsHub.FORM,
    title: "New Form",
    icon: iconPath.form,
  },
];
