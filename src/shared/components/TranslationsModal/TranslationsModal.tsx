import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Typography } from "antd";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/shared/components/form";
import { createTranslationsSchema } from "@/shared/components/TranslationsModal/translations.modal.schema";
import { MAX_CODE_LENGTH } from "@/shared/constants/validation";
import { type TranslationFormValue } from "@/shared/types/translations";

interface TranslationsFormValues {
    translations: TranslationFormValue[];
}

interface TranslationsModalProps {
    open: boolean;
    value: TranslationFormValue[];
    onDone: (translations: TranslationFormValue[]) => void;
    onCancel: () => void;
}

export function TranslationsModal({ open, value, onDone, onCancel }: TranslationsModalProps) {
    const { t } = useTranslation("app");

    const schema = createTranslationsSchema({
        required: t("validation.required"),
        duplicateLanguage: t("translations.duplicateLanguage"),
        languagePattern: t("validation.languagePattern"),
    });

    const { control, handleSubmit, reset } = useForm<TranslationsFormValues>({
        defaultValues: {
            translations: value,
        },
        resolver: zodResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations",
    });

    useEffect(() => {
        if (open) {
            reset({
                translations: value,
            });
        }
    }, [open, value, reset]);

    const handleFormSubmit = (values: TranslationsFormValues) => {
        onDone(values.translations);
    };

    return (
        <Modal
            title={t("translations.title")}
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {t("common.cancel")}
                </Button>,
                <Button
                    key="done"
                    type="primary"
                    onClick={() => void handleSubmit(handleFormSubmit)()}
                >
                    {t("common.done")}
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Flex vertical gap="middle">
                    {fields.length === 0 && (
                        <Typography.Text type="secondary">
                            {t("translations.empty")}
                        </Typography.Text>
                    )}

                    {fields.map((field, index) => (
                        <Flex key={field.id} gap="small" align="start">
                            <FormInput
                                control={control}
                                name={`translations.${index}.language`}
                                placeholder={t("translations.languagePlaceholder")}
                                maxLength={MAX_CODE_LENGTH}
                                uppercase
                            />

                            <FormInput
                                control={control}
                                name={`translations.${index}.value`}
                                placeholder={t("translations.valuePlaceholder")}
                            />

                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => remove(index)}
                            />
                        </Flex>
                    ))}

                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() =>
                            append({
                                language: "",
                                value: "",
                            })
                        }
                    >
                        {t("translations.add")}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
}
