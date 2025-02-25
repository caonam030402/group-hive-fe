import React from "react";

import CreateItem from "./CreateItem";
import TemplateItem from "./TemplateItem";

export default function SideContent() {
  return (
    <div className="w-full bg-background px-5 py-3">
      <h1 className="my-3">Recommended</h1>
      <div className="scroll mt-3 grid h-[60vh] grid-cols-4 gap-4">
        <CreateItem />
        {Array.from({ length: 20 })
          .fill(0)
          .map((_item, index) => (
            <div key={index}>
              <TemplateItem />
            </div>
          ))}
      </div>
    </div>
  );
}
