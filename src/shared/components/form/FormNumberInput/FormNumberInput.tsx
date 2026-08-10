import type { InputNumberProps } from "antd";
import { Form, InputNumber } from "antd";
import type { ReactNode } from "react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

interface FormNumberInputProps<T extends FieldValues> {
    control: Control<T>;

    name: FieldPath<T>;

    label?: ReactNode;

    placeholder?: string;

    disabled?: boolean;

    inputProps?: InputNumberProps;
}

export function FormNumberInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled,
    inputProps,
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
