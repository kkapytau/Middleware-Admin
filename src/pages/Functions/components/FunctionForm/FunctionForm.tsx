import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form } from "antd";
import { type Control, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type FlowFunctionFormValues } from "@/entities/flowFunction/model";
import { FormInput } from "@/shared/components/form";

interface FunctionFormProps {
    control: Control<FlowFunctionFormValues>;
}

export function FunctionForm({ control }: FunctionFormProps) {
    const { t } = useTranslation("app");

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    return (
        <>
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
                            <FormInput
                                control={control}
                                name={`values.${index}.key`}
                                placeholder={t("form.key")}
                            />

                            <FormInput
                                control={control}
                                name={`values.${index}.value`}
                                placeholder={t("form.value")}
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
        </>
    );
}
