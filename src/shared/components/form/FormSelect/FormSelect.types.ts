import type { SelectProps } from "antd";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;

    name: FieldPath<T>;

    label?: ReactNode;

    placeholder?: string;

    disabled?: boolean;

    options?: SelectProps["options"];

    loading?: boolean;

    allowClear?: boolean;

    showSearch?: boolean;
}
