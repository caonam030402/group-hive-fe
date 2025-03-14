import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { type BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  type DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { MagicWand } from "@phosphor-icons/react";
import type * as Y from "yjs";

import { renderFullName } from "@/utils/helpers";

interface IProps {
  doc: Y.Doc;
  provider: any;
  user: IUser;
}

const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Continue with AI",
  onItemClick: async () => {
    const selectedText = editor.getSelectedText();

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: selectedText }),
      });

      if (!response.ok) throw new Error("Failed to generate text");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      reader?.read().then(function processText({ done, value }) {
        if (done) {
          return;
        }
        const chunk = decoder.decode(value, { stream: true });
        // eslint-disable-next-line no-underscore-dangle
        editor?._tiptapEditor?.commands.insertContent(JSON.parse(chunk).tweet);
        reader?.read().then(processText);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  aliases: ["ai", "continue"],
  group: "AI",
  icon: <MagicWand size={18} />,
  subtext: "Continue writing with AI",
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor,
): DefaultReactSuggestionItem[] => [
  insertHelloWorldItem(editor),
  ...getDefaultReactSlashMenuItems(editor),
];

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

  return (
    <BlockNoteView
      theme="light"
      className="h-full"
      editor={editor}
      slashMenu={false}
    >
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}
