import { docsHubSidebarMenu } from "@/constants/docsHub";
import { EListDocsHub } from "@/enums/docsHub";
import useNavigate from "@/hooks/navigate";

export function useDocsNavigation() {
  const { navigate, getDynamicRoute } = useNavigate();
  const listUrl = {
    [EListDocsHub.DOC]: "doc",
    [EListDocsHub.SHEET]: "sheet",
    [EListDocsHub.SLIDE]: "slide",
    [EListDocsHub.FORM]: "form",
  };
  const handleOpenPage = ({ id, type }: { id: string; type: EListDocsHub }) => {
    navigate({
      customUrl: `${listUrl[type]}`,
      paramsList: [{ name: "id", value: id }],
    });
  };

  const keyMenuFolder = getDynamicRoute() || "";

  const menuFolderActive = docsHubSidebarMenu.find((item) =>
    item.link.includes(keyMenuFolder),
  );

  return {
    handleOpenPage,
    keyMenuFolder,
    menuFolderActive,
  };
}
