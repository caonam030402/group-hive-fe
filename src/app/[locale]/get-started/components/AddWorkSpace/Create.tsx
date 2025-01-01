import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Checkbox, Form } from "@nextui-org/react";
import React from "react";

import {
  countriesList,
  industriesList,
  sizeWorkplaceList,
} from "@/constants/common";

export default function Create() {
  return (
    <Form className="my-3 flex w-full flex-col gap-5">
      <Input
        labelPlacement="outside"
        label="Name"
        placeholder="Organization name"
      />
      <Autocomplete
        labelPlacement="outside"
        placeholder="Select your industry"
        label="Industry"
      >
        {industriesList.map((industry) => (
          <AutocompleteItem value="" key={industry.category}>
            {industry.category}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        labelPlacement="outside"
        placeholder="Select your size"
        label="Size"
      >
        {sizeWorkplaceList.map((size) => (
          <AutocompleteItem value={size.value} key={size.value}>
            {size.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        labelPlacement="outside"
        placeholder="Select your region"
        label="Region"
      >
        {countriesList.map((country) => (
          <AutocompleteItem value={country.value} key={country.value}>
            {country.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Checkbox size="sm" classNames={{ label: "text-xs" }} defaultSelected>
        I have read and accept the Terms of Service and Privacy Policy.
      </Checkbox>
    </Form>
  );
}
