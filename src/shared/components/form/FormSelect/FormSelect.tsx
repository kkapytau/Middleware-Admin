import { Form, Select } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormSelectProps } from "./FormSelect.types";

export function FormSelect<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled,
    options,
    loading,
    allowClear,
    showSearch,
}: FormSelectProps<T>) {
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
                    <Select
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        options={options}
                        loading={loading}
                        allowClear={allowClear}
                        showSearch={
                            showSearch
                                ? {
                                      optionFilterProp: "label",
                                  }
                                : false
                        }
                    />
                </Form.Item>
            )}
        />
    );
}
