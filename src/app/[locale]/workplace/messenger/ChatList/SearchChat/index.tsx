import { Input } from "@nextui-org/input";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import React from "react";

export default function SearchChat() {
  return (
    <Input startContent={<GoSearch />} placeholder="Search">
      SearchChat
    </Input>
  );
}
