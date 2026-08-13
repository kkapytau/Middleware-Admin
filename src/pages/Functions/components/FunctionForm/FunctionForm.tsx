import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input } from "antd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
    createFlowFunctionFormSchema,
    defaultFlowFunctionFormValues,
    type FlowFunctionFormValues,
} from "@/entities/flowFunction/model";
import { FormInput } from "@/shared/components/form";

interface FunctionFormProps {
    defaultValues?: FlowFunctionFormValues;

    onSubmit: (values: FlowFunctionFormValues) => Promise<void>;

    onCancel: () => void;
}

export function FunctionForm({ defaultValues, onSubmit, onCancel }: FunctionFormProps) {
    const { t } = useTranslation("app");

    const schema = createFlowFunctionFormSchema({
        functionNameRequired: t("validation.functionNameRequired"),
        keyRequired: t("validation.keyRequired"),
        valueRequired: t("validation.valueRequired"),
        duplicateKey: t("validation.duplicateKey"),
    });

    const { control, handleSubmit } = useForm<FlowFunctionFormValues>({
        defaultValues: defaultValues ?? defaultFlowFunctionFormValues,
        resolver: zodResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    return (
        <Form
            layout="horizontal"
            labelCol={{ flex: "110px" }}
            wrapperCol={{ flex: 1 }}
            colon={false}
            component="form"
            onSubmitCapture={(event) => {
                event.preventDefault();
                void handleSubmit(onSubmit)(event);
            }}
        >
            <FormInput
                control={control}
                name="name"
                label={t("form.functionName")}
                placeholder={t("form.enterFunctionName")}
            />

            <Form.Item label={t("form.keyValuePairs")}>
                <Flex vertical gap={8}>
                    {fields.map((field, index) => (
                        <Flex key={field.id} gap={8}>
                            <Controller
                                control={control}
                                name={`values.${index}.key`}
                                render={({ field: inputField, fieldState }) => (
                                    <Form.Item
                                        validateStatus={fieldState.error ? "error" : undefined}
                                        help={fieldState.error?.message}
                                        style={{ flex: 1, marginBottom: 0 }}
                                    >
                                        <Input {...inputField} placeholder={t("form.key")} />
                                    </Form.Item>
                                )}
                            />

                            <Controller
                                control={control}
                                name={`values.${index}.value`}
                                render={({ field: inputField, fieldState }) => (
                                    <Form.Item
                                        validateStatus={fieldState.error ? "error" : undefined}
                                        help={fieldState.error?.message}
                                        style={{ flex: 1, marginBottom: 0 }}
                                    >
                                        <Input {...inputField} placeholder={t("form.value")} />
                                    </Form.Item>
                                )}
                            />

                            <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                disabled={fields.length === 1}
                                onClick={() => remove(index)}
                            />
                        </Flex>
                    ))}

                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() =>
                            append({
                                key: "",
                                value: "",
                            })
                        }
                    >
                        {t("actions.addPair")}
                    </Button>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Flex justify="end" gap={8}>
                    <Button onClick={onCancel}>{t("actions.cancel")}</Button>

                    <Button type="primary" htmlType="submit">
                        {t("actions.save")}
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}
