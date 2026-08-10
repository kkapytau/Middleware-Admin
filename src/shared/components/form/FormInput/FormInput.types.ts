import type { InputProps } from "antd";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
    control: Control<T>;

    name: FieldPath<T>;

    label?: ReactNode;

    placeholder?: string;

    disabled?: boolean;

    inputProps?: InputProps;
}
