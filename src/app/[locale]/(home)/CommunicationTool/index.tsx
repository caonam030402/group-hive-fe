import { Accordion, AccordionItem, Button } from "@heroui/react";
import { BiAnchor } from "@react-icons/all-files/bi/BiAnchor";
import { BiBraille } from "@react-icons/all-files/bi/BiBraille";
import { BiFile } from "@react-icons/all-files/bi/BiFile";
import { BiLineChart } from "@react-icons/all-files/bi/BiLineChart";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { fadeAnimationVariants } from "@/constants/animation";
import { cn } from "@/libs/utils";

const keyAccordion = {
  businessScale: "0",
  globalWorkforce: "1",
  insights: "2",
  doneInMinutes: "3",
};

const listAccordion = [
  {
    title: "Designed for businesses of any scale",
    content: "Manage 1, 100 or 1000 stores with 1 highly efficient digital hub",
    value: keyAccordion.businessScale,
    icon: <BiBraille size={24} />,
    video:
      "https://framerusercontent.com/assets/3iiUyXf3NFxGzXdNizRJYlD4AY.mp4",
  },
  {
    title: "Run a global workforce from 1 platform",
    content:
      "Transform cross-border collaboration with Lark's intuitive translation feature",
    value: keyAccordion.globalWorkforce,
    icon: <BiAnchor size={24} />,
    video:
      "https://framerusercontent.com/assets/zFCSc5PapFroyiv6eVnx2v6fgM.mp4",
  },
  {
    title: "Get insights from frontline to boardroom",
    content: "Centralise all your business data in one place and mine insights",
    value: keyAccordion.insights,
    icon: <BiLineChart size={24} />,
    video: "https://framerusercontent.com/assets/dfqYZkrkY6y0hu8FsuRWlQ2kQ.mp4",
  },
  {
    title: "Get things done in minutes, not days",
    content:
      "Digitalise your workflows like approvals, daily checklist submissions, and reporting",
    value: keyAccordion.doneInMinutes,
    icon: <BiFile size={24} />,
    video: "https://framerusercontent.com/assets/SLjzS4z4yUlLpaFu3F7Gv348o.mp4",
  },
];
export default function CommunicationTool() {
  const [selectKey, setSelectKey] = React.useState<string>("0");

  const videoActive = listAccordion.find(
    (item) => item.value === selectKey,
  )?.video;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-3xl font-semibold">
        The productivity <span className="text-primary">Superapp</span> all
        businesses need
      </div>
      <div className="my-3 text-base text-gray-800">
        Lark digitalizes operations from HQ to storefront, streamlines
        communication, and empowers <br /> your business to achieve operational
        excellence with tools for project management, video <br /> conferencing,
        chat, documentation and more!
      </div>
      <div className="mt-4 flex gap-10">
        <div className="flex w-2/5 flex-col items-start gap-5">
          <Accordion
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys as Set<string>)[0];
              setSelectKey(selectedKey?.toString() || "0");
            }}
            selectedKeys={[selectKey]}
            variant="light"
          >
            {listAccordion.map((item, index) => {
              const isActive = selectKey === item.value;
              return (
                <AccordionItem
                  classNames={{
                    base: "bg-transparent border-none",
                    content: "pl-9 text-start pt-0 text-gray-500",
                    title: cn("text-[16px] font-semibold", {
                      "text-primary": isActive,
                    }),
                  }}
                  key={index}
                  title={
                    <div className="flex items-center gap-3">
                      {" "}
                      {item.icon}
                      {item.title}
                    </div>
                  }
                >
                  {item.content}
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button color="primary" size="lg">
            Book a demo
          </Button>
        </div>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.video
              key={videoActive}
              variants={fadeAnimationVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              muted
              className="size-full rounded-3xl object-cover"
              src={videoActive}
              autoPlay
              loop
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
