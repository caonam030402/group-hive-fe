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
  author: IUser;
  lastOpenedAt: string;
  docsType: EListBase;
}
