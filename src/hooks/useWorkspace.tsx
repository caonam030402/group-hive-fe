import { useRouter } from "next-nprogress-bar";

import { ENameLocalS, PATH } from "@/constants";
import { getLocalStorage, setLocalStorage } from "@/utils/clientStorage";

export default function useWorkspace() {
  const workspaceId: string = getLocalStorage({
    key: ENameLocalS.WORKSPACE_ID,
  });
  const router = useRouter();
  const handleSaveWorkspaceId = (id: string) => {
    setLocalStorage({ key: ENameLocalS.WORKSPACE_ID, value: id });
  };
  const handleNavigateToWorkplace = () => {
    router.push(PATH.WORKPLACE);
  };

  const handleSaveAndNavigateToWorkplace = (id: string) => {
    handleSaveWorkspaceId(id);
    handleNavigateToWorkplace();
  };
  return {
    workspaceId,
    handleSaveWorkspaceId,
    handleNavigateToWorkplace,
    handleSaveAndNavigateToWorkplace,
  };
}
