"use client";

import React from "react";

import Header from "@/components/layouts/Header";

import Introduce from "./components/Introduce";
import OpsEx from "./components/OpsEx";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      {/* BODY */}
      <Introduce />

      <div className="container mx-auto">
        <OpsEx />
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
