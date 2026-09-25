import type { SwitchProps } from "antd";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormSwitchProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    entityName: string;
    label: ReactNode;
    disabled?: boolean;
    switchProps?: SwitchProps;
}
