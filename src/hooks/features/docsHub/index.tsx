import { useDocsNavigation } from "./useDocsNavigation";
import { useDocsTableConfig } from "./useDocsTableConfig";

export default function useDocsHub() {
  const { handleOpenPage, keyMenuFolder, menuFolderActive } =
    useDocsNavigation();
  const { listColumnsTable } = useDocsTableConfig();

  return {
    handleOpenPage,
    menuFolderActive,
    keyMenuFolder,
    listColumnsTable,
  };
}
