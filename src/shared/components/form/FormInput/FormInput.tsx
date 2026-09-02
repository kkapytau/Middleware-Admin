import { Form, Input } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormInputProps } from "@/shared/components/form/FormInput/FormInput.types";

export function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled,
    prefix,
    maxLength,
    uppercase,
}: FormInputProps<T>) {
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
                    <Input
                        {...field}
                        prefix={prefix}
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={maxLength}
                        onChange={(event) => {
                            const value = uppercase
                                ? event.target.value.toUpperCase()
                                : event.target.value;

                            field.onChange(value);
                        }}
                    />
                </Form.Item>
            )}
        />
    );
}
