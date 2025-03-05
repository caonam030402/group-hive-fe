export interface ICreateDocsHub {
  name: string;
  author: {
    id: IUser["id"];
  };
  lastOpenedAt: string;
  docsType: EListBase;
}

export interface IDocsHub {
  id: string;
  name: string;
  author: {
    id: IUser["id"];
  };
  lastOpenedAt: string;
  docsType: EListBase;
}
