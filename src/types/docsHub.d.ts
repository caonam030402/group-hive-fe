import type { EScopeDocsHub } from "@/enums/docsHub";

export interface ICreateDocsHub {
  name: string;
  author: {
    id: IUser["id"];
  };
  lastOpenedAt: string;
  docsType: EListDocsHub;
  scope: EScopeDocsHub;
}

export interface IDocsHub {
  id: string;
  name: string;
  author: IUser;
  lastOpenedAt: string;
  docsType: EListDocsHub;
  pinned: boolean;
}

export interface IDocsHubPinned {
  id: string;
  docsHub: IDocsHub;
}
