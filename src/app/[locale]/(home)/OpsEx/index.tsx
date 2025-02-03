import { Tab, Tabs } from "@heroui/react";
import { BiAnalyse } from "@react-icons/all-files/bi/BiAnalyse";
import { BiBorderOuter } from "@react-icons/all-files/bi/BiBorderOuter";
import { BiChat } from "@react-icons/all-files/bi/BiChat";
import { BiDevices } from "@react-icons/all-files/bi/BiDevices";
import { BiGift } from "@react-icons/all-files/bi/BiGift";
import { BiHomeSmile } from "@react-icons/all-files/bi/BiHomeSmile";
import { BiLineChart } from "@react-icons/all-files/bi/BiLineChart";
import { IoIosGlobe } from "@react-icons/all-files/io/IoIosGlobe";
import { RiMouseLine } from "@react-icons/all-files/ri/RiMouseLine";
import React from "react";

import Content from "./Content";

export const listTab = [
  {
    label: "All business",
    value: "all",
    content: {
      subImage:
        "https://framerusercontent.com/images/FFGEjjmgFrG9BXvsqAz02gc7JE.jpg?scale-down-to=512",
      image:
        "https://framerusercontent.com/images/532NmGeE4Q8pzrDtAlUj61iAgE.png",
      list: [
        {
          icon: <IoIosGlobe size={25} />,
          content:
            "Work together globally, with translations for chats, documents, meetings, and more",
        },
        {
          icon: <BiDevices size={24} />,
          content: "Manage projects and track progress from your phone",
        },
        {
          icon: <BiAnalyse size={24} />,
          content:
            "Streamline approval process for purchase, promotions, and more",
        },
      ],
    },
  },
  {
    label: "Technology",
    value: "small",
    content: {
      subImage:
        "https://framerusercontent.com/images/0sqX5PjLupfj5dti6Bm5oIjnbmE.png?scale-down-to=512",
      image:
        "https://framerusercontent.com/images/dCu3eWiYtmMDXlMYO4K2lkYrUA.png?scale-down-to=512",
      list: [
        {
          icon: <IoIosGlobe size={25} />,
          content:
            "Collaborate across borders with translations in chat, docs, meetings",
        },
        {
          icon: <RiMouseLine size={24} />,
          content: "Manage projects and visualise progress in one-click",
        },
        {
          icon: <BiBorderOuter size={24} />,
          content:
            "Replace multiple tools for chat, video, docs, analytics and more with Lark",
        },
      ],
    },
  },
  {
    label: "Retail",
    value: "medium",
    content: {
      subImage:
        "https://framerusercontent.com/images/GSs5sT9MFj9f5MOUpZufYHXFcnU.png?scale-down-to=512",
      image:
        "https://framerusercontent.com/images/EmUAB9ANiRyy4eNyIwNcZAn68.png?scale-down-to=512",
      list: [
        {
          icon: <BiChat size={24} />,
          content:
            "Increase frontline productivity with mobile-optimized chat-based task management",
        },
        {
          icon: <BiHomeSmile size={24} />,
          content:
            "Digitalize store opening and closing, incident reporting, approvals workfows",
        },
        {
          icon: <BiLineChart size={24} />,
          content: "Get daily insights on sales and revenue on your phone",
        },
      ],
    },
  },
  {
    label: "Food & Beverage",
    value: "large",
    content: {
      subImage:
        "https://framerusercontent.com/images/bdyS8waIsPzVit1fY6LAtHqNaBA.jpg",
      image:
        "https://framerusercontent.com/images/f4ueCeNewXNf0kS9TIiFy65b0.png?scale-down-to=512",
      list: [
        {
          icon: <BiChat size={24} />,
          content:
            "Streamline HQ <> frontline communication with mobile-optimized secure chat",
        },
        {
          icon: <BiHomeSmile size={24} />,
          content: "Digitalize store opening and closing checklists",
        },
        {
          icon: <BiGift size={24} />,
          content:
            "Set up approval workflows for purchase, promotions and more",
        },
      ],
    },
  },
];

export default function OpsEx() {
  return (
    <div className="container mx-auto my-16 w-full text-center">
      <div className="text-3xl font-semibold">
        Plan, collaborate, execute and measure
      </div>
      <p className="mt-4 text-base text-gray-500">
        Lark empowers you to achieve operational excellence by providing tools
        to organize your <br /> business, digitalize workflows, and ensure your
        plans turn into action on the ground.
      </p>
      <Tabs color="primary" aria-label="Tabs sizes" className="mt-7" size="lg">
        {listTab.map((tab) => (
          <Tab key={tab.value} title={tab.label}>
            <Content tab={tab} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
