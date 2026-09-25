import { Form, InputNumber } from "antd";
import { Controller, type FieldValues } from "react-hook-form";

import { AUTOMATION_ID } from "@/shared/lib";

import type { FormNumberInputProps } from "./FormNumberInput.types";

export function FormNumberInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled,
    inputProps,
    entityName,
}: FormNumberInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item
                    label={label}
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                >
                    <InputNumber
                        data-testid={AUTOMATION_ID.formNumberInput(entityName, name)}
                        {...field}
                        value={field.value ?? null}
                        onChange={(value) => {
                            field.onChange(value ?? undefined);
                        }}
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{ width: "100%" }}
                        {...inputProps}
                    />
                </Form.Item>
            )}
        />
    );
}
