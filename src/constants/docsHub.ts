import { FolderOpen, FolderSimpleUser, House } from "@phosphor-icons/react";

import { EScopeDocsHub } from "@/enums/docsHub";

export const docsHubSidebarMenu = [
  {
    key: EScopeDocsHub.WORKSPACE,
    scope: EScopeDocsHub.WORKSPACE,
    title: "Workspace",
    iconComponent: House,
    link: "/workplace/base/home",
  },
  {
    key: EScopeDocsHub.PERSONAL,
    title: "My Drive",
    iconComponent: FolderSimpleUser,
    link: "/workplace/base/my-drive",
  },
  {
    key: EScopeDocsHub.PERSONAL,
    scope: EScopeDocsHub.SHARED,
    title: "Shared With Me",
    iconComponent: FolderOpen,
    link: "/workplace/base/shared-with-me",
  },
];
