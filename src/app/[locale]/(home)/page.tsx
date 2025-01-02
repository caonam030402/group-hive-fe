"use client";

import React from "react";

import Header from "@/components/layouts/Header";

import Introduce from "./components/Introduce";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      {/* BODY */}
      <div>
        <Introduce />
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
