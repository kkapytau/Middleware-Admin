import { Checkbox, Form } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormCheckboxProps } from "./FormCheckbox.types";

export function FormCheckbox<T extends FieldValues>({
    control,
    name,
    children,
    disabled,
    checkboxProps,
}: FormCheckboxProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item
                    label=" "
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                >
                    <Checkbox
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        disabled={disabled}
                        {...checkboxProps}
                    >
                        {children}
                    </Checkbox>
                </Form.Item>
            )}
        />
    );
}
