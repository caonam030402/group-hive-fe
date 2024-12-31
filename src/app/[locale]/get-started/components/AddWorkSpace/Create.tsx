import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Checkbox, Form } from "@nextui-org/react";
import React from "react";

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export default function Create() {
  return (
    <Form className="flex flex-col gap-5">
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
        {animals.map((animal) => (
          <AutocompleteItem value="" key={animal.key}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        labelPlacement="outside"
        placeholder="Select your size"
        label="Size"
      >
        {animals.map((animal) => (
          <AutocompleteItem value="" key={animal.key}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        labelPlacement="outside"
        placeholder="Select your region"
        label="Region"
      >
        {animals.map((animal) => (
          <AutocompleteItem value="" key={animal.key}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Checkbox size="sm" classNames={{ label: "text-sm" }} defaultSelected>
        {" "}
        I have read and accept the Terms of Service and Privacy Policy.
      </Checkbox>
    </Form>
  );
}
