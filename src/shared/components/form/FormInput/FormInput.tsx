import { Form, Input } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormInputProps } from "./FormInput.types";

export function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled,
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
                    <Input {...field} placeholder={placeholder} disabled={disabled} />
                </Form.Item>
            )}
        />
    );
}
