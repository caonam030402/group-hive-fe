import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import type { listTab } from ".";

interface IProps {
  tab: (typeof listTab)[0];
}

export default function Content({ tab }: IProps) {
  const { content } = tab;
  return (
    <div className="mt-7 flex gap-5">
      <div className="relative flex-1">
        <motion.div
          key={content.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            width={2000}
            height={2000}
            src={content.image}
            alt=""
            className="size-full rounded-md object-cover"
          />
        </motion.div>
        <motion.div
          key={content.subImage}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute left-[-8%] top-[30%]"
        >
          <Image
            width={2000}
            height={2000}
            src={content.subImage}
            alt=""
            className="w-[280px] rounded-xl"
          />
        </motion.div>
      </div>
      <div className="flex w-[45%] flex-col items-start justify-center gap-2 rounded-3xl bg-primary/15 p-14">
        <div className="text-2xl font-semibold">{tab.label}</div>
        {content.list.map((item, index) => (
          <div
            key={index}
            className="mt-6 flex items-center gap-2 text-gray-500"
          >
            <Button
              size="lg"
              variant="bordered"
              isIconOnly
              className="rounded-full border-[0.5px]"
            >
              {item.icon}
            </Button>
            <div className="text-start text-gray-500">{item.content}</div>
          </div>
        ))}
        <Button size="lg" className="mt-6" color="primary">
          Book a demo
        </Button>
      </div>
    </div>
  );
}
