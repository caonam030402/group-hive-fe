"use client";

import React from "react";

import Header from "@/components/layouts/Header";

import CommunicationTool from "./components/CommunicationTool";
import Introduce from "./components/Introduce";
import OpsEx from "./components/OpsEx";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      {/* BODY */}
      <Introduce />
      <OpsEx />
      <div className="container mx-auto">
        <CommunicationTool />
      </div>
      {/* <Button
        onClick={() => {
          signOut();
        }}
        color="primary"
      >
        Button
      </Button> */}
    </div>
  );
}
