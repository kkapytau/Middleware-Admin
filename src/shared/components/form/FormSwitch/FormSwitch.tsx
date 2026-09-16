import { Form, Switch } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormSwitchProps } from "./FormSwitch.types";

export function FormSwitch<T extends FieldValues>({
    control,
    name,
    label,
    disabled,
    switchProps,
}: FormSwitchProps<T>) {
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
                    <Switch
                        checked={Boolean(field.value)}
                        onChange={field.onChange}
                        disabled={disabled}
                        {...switchProps}
                    />
                </Form.Item>
            )}
        />
    );
}
