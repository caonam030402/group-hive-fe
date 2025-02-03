import { Input } from "@heroui/input";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import React from "react";

export default function SearchChat() {
  return (
    <Input startContent={<GoSearch />} placeholder="Search">
      SearchChat
    </Input>
  );
}
