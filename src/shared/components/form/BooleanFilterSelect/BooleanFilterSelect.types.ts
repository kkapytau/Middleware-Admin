import type { Control, FieldValues, Path } from "react-hook-form";

export interface BooleanFilterSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    allLabel: string;
    trueLabel: string;
    falseLabel: string;
    disabled?: boolean;
}
