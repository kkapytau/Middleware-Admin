import type { SelectProps } from "antd";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

type FormSelectOption = Omit<NonNullable<SelectProps["options"]>[number], "value"> & {
    value?: string | number | boolean | null;
};

export interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;

    name: FieldPath<T>;

    label?: ReactNode;

    placeholder?: string;

    disabled?: boolean;

    options?: FormSelectOption[];

    loading?: boolean;

    allowClear?: boolean;

    showSearch?: boolean;

    allowFalsyValue?: boolean;
}
