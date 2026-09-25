import { Form, Select } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { AUTOMATION_ID } from "@/shared/lib";

import type { BooleanFilterSelectProps } from "./BooleanFilterSelect.types";

const ALL_VALUE = "__all__";

export function BooleanFilterSelect<T extends FieldValues>({
    control,
    name,
    label,
    allLabel,
    trueLabel,
    falseLabel,
    disabled,
    entityName,
}: BooleanFilterSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const value =
                    field.value === true ? true : field.value === false ? false : ALL_VALUE;

                return (
                    <Form.Item
                        label={label}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Select
                            data-testid={AUTOMATION_ID.formSelect(entityName, name)}
                            value={value}
                            onChange={(nextValue) => {
                                field.onChange(nextValue === ALL_VALUE ? "" : nextValue);
                            }}
                            options={[
                                {
                                    value: ALL_VALUE,
                                    label: allLabel,
                                },
                                {
                                    value: true,
                                    label: trueLabel,
                                },
                                {
                                    value: false,
                                    label: falseLabel,
                                },
                            ]}
                            disabled={disabled}
                        />
                    </Form.Item>
                );
            }}
        />
    );
}
