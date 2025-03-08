/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useState, useEffect } from "react";
import { CustomFieldInterface } from "./form-maker";
import Creatable from "react-select/creatable";
import { cn } from "@/lib/utils";
import { fetchService } from "@/boot/fetch-service";
import { states } from "@/constants/states";

const SelectInput = React.memo(function SelectInput({
  form,
  item,
}: {
  form: any;
  item: CustomFieldInterface;
}) {
  const { id, parentError, formikId } = item;
  const [options, setOptions] = useState(item.options || []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleValueChange = useCallback(
    (selectedOption: any) => {
      form.setFieldValue(formikId, selectedOption?.value || undefined);
    },
    [form, formikId]
  );

  const fetchDynamicOptions = async () => {
    if (
      item?.dynamicOptions?.dependsOn &&
      item?.parentValue?.[item?.dynamicOptions?.dependsOn]
    ) {
      const country = item?.parentValue?.[item?.dynamicOptions?.dependsOn];
      try {
        const data = await fetchService(
          `${item.dynamicOptions.endpoint.replace(
            "/api/",
            ""
          )}?country=${country}`
        );

        setOptions(data?.states || (states as any)[country]?.["states"] || []);
      } catch (error) {
        console.error("Error fetching dynamic options", error);
        setOptions((states as any)[country]?.["states"] || []);
      }
    }
  };

  useEffect(() => {
    if (
      item?.dynamicOptions?.dependsOn &&
      item?.parentValue?.[item?.dynamicOptions?.dependsOn]
    ) {
      fetchDynamicOptions();
    }
  }, [
    item?.dynamicOptions?.dependsOn
      ? item?.parentValue?.[item?.dynamicOptions?.dependsOn]
      : "",
  ]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <span className="text-foreground">{item.label}</span>
      <Creatable
        isClearable
        isValidNewOption={() => false}
        options={options?.map((value) => ({ label: value, value })) || []}
        onChange={handleValueChange}
        placeholder={item.parentValue[item.id] || item.label}
        classNames={{
          container: () => "w-full outline-none",
          control: () =>
            cn(
              "outline-none relative focus:ring-0 h-10 w-full shadow-none rounded-sm bg-input text-muted border !border-border text-sm"
            ),
          input: () => "w-full h-full outline-none line-clamp-1",
          placeholder: () => "line-clamp-1",
          indicatorSeparator: () => "hidden",
          menuList: () =>
            "flex flex-col relative w-full cursor-default select-none items-center rounded-sm p-0 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          valueContainer: () =>
            "outline-none relative flex w-full cursor-default select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        }}
      />
      {parentError?.[id] && (
        <small className="text-negative">{parentError[id]}</small>
      )}
    </>
  );
});

export default SelectInput;
