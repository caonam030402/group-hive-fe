"use client";

import {
  BreadcrumbItem,
  Breadcrumbs as BreadcrumbsComponent,
} from "@heroui/react";
import React from "react";

export default function Breadcrumbs() {
  return (
    <BreadcrumbsComponent
      itemsAfterCollapse={2}
      itemsBeforeCollapse={1}
      maxItems={3}
    >
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#music">Music</BreadcrumbItem>
      <BreadcrumbItem href="#artist">Artist</BreadcrumbItem>
      <BreadcrumbItem href="#album">Album</BreadcrumbItem>
      <BreadcrumbItem href="#song">Song</BreadcrumbItem>
    </BreadcrumbsComponent>
  );
}
