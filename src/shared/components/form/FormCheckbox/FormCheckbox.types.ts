import type { CheckboxProps } from "antd";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormCheckboxProps<T extends FieldValues> {
    control: Control<T>;

    name: FieldPath<T>;

    children: ReactNode;

    disabled?: boolean;

    checkboxProps?: CheckboxProps;
}
