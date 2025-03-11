import { EListDocsHub } from "@/enums/docsHub";

import useNavigate from "../navigate";

export default function useDocsHub() {
  const { navigate } = useNavigate();
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
  return {
    handleOpenPage,
  };
}
