"use client";

import React from "react";

import Header from "@/components/layouts/Header";

import CommunicationTool from "./CommunicationTool";
import Introduce from "./Introduce";
import OpsEx from "./OpsEx";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      <Introduce />
      <OpsEx />
      <div className="container mx-auto">
        <CommunicationTool />
      </div>
    </div>
  );
}
