import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import type { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import type * as Y from "yjs";

import { renderFullName } from "@/utils/helpers";

interface IProps {
  doc: Y.Doc;
  provider: any;
  user: IUser;
}

export default function BlockNote({ doc, provider, user }: IProps) {
  const getRandomColor = (): string => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEEAD",
      "#D4A5A5",
      "#9B59B6",
      "#3498DB",
      "#E67E22",
      "#1ABC9C",
    ];
    return colors[Math.floor(Math.random() * colors.length)] ?? "";
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      fragment: doc.getXmlFragment("document-store"),

      user: {
        name: renderFullName(user?.firstName, user?.lastName),
        color: getRandomColor(),
      },
    },
  });

  return <BlockNoteView theme="light" className="h-full" editor={editor} />;
}
