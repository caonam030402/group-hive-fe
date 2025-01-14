"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/react";
import React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import {
  countriesList,
  industriesList,
  sizeWorkplaceList,
} from "@/constants/common";

import type { FormType } from ".";

interface IProps {
  form: UseFormReturn<FormType, any, undefined>;
}

export default function Create({ form }: IProps) {
  const errorFields = form.formState.errors;
  return (
    <div className="my-1 flex w-full flex-col gap-5">
      <Input
        labelPlacement="outside"
        label="Name"
        placeholder="Organization name"
        errorMessage={errorFields.name?.message}
        isInvalid={!!errorFields.name?.message}
        {...form.register("name")}
      />

      {/* Industries Field */}
      <Controller
        control={form.control}
        name="industry"
        render={({ field: { onChange } }) => (
          <Autocomplete
            labelPlacement="outside"
            placeholder="Select your industry"
            label="Industry"
            isInvalid={!!errorFields.industry?.message}
            errorMessage={errorFields.industry?.message}
            onInputChange={onChange}
          >
            {industriesList.map((industry) => (
              <AutocompleteItem key={industry.category}>
                {industry.category}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />

      {/* Size Field */}
      <Controller
        control={form.control}
        name="size"
        render={({ field: { onChange } }) => (
          <Autocomplete
            labelPlacement="outside"
            errorMessage={errorFields.size?.message}
            isInvalid={!!errorFields.size?.message}
            placeholder="Select your size"
            label="Size"
            onInputChange={(e) => onChange(e)}
          >
            {sizeWorkplaceList.map((size) => (
              <AutocompleteItem key={size.value}>{size.name}</AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />

      {/* Region Field */}
      <Controller
        control={form.control}
        name="region"
        render={({ field: { onChange } }) => (
          <Autocomplete
            labelPlacement="outside"
            placeholder="Select your region"
            errorMessage={errorFields.region?.message}
            isInvalid={!!errorFields.region?.message}
            label="Region"
            onInputChange={onChange}
          >
            {countriesList.map((country) => (
              <AutocompleteItem key={country.value}>
                {country.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />

      {/* Terms Field */}
      <Checkbox
        size="sm"
        isInvalid={!!errorFields.terms?.message}
        classNames={{ label: "text-xs" }}
        {...form.register("terms")}
      >
        I have read and accept the Terms of Service and Privacy Policy.
      </Checkbox>
    </div>
  );
}
