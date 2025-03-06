import React, { useEffect, useCallback } from "react";
import { FormMakerInterface, OptionType } from "./form-maker";
import Creatable from "react-select/creatable";
import { cn } from "@/lib/utils";

const SelectInput = React.memo(function SelectInput({
  form,
  item,
}: {
  form: any;
  item: FormMakerInterface["fields"][0];
}) {
  const handleValueChange = useCallback(
    (selectedOption: OptionType) => {
      form.setFieldValue(item.key, selectedOption?.value || undefined);
    },
    [item.key]
  );

  useEffect(() => {
    if (item.defaultValue && !form.values[item.key]) {
      form.setFieldValue(item.key, item.defaultValue);
    }
  }, [item.defaultValue, form.values[item.key], item.key]);

  return (
    <>
      <Creatable
        isClearable
        isValidNewOption={() => false}
        options={item.options}
        onChange={(item: any) => handleValueChange(item)}
        placeholder={
          item.options?.find(
            (optItem) => optItem.value === form.values[item.key]
          )?.label ||
          item.placeholder ||
          item.label
        }
        classNames={{
          container: () => "w-full outline-none",
          control: () =>
            cn(
              "outline-none relative focus:ring-0 h-10 w-full shadow-none rounded-sm bg-input text-muted border !border-border text-sm",
              { "pl-6": item.icon },
              item.labelClassName
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
      {item.icon ? (
        <div className="absolute left-2.5 top-2.5">
          {typeof item.icon == "string" ? <></> : item.icon}
        </div>
      ) : (
        <></>
      )}
    </>
  );
});
export default SelectInput;
