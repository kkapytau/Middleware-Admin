import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useLocales } from "@/entities/locale";
import { createTranslationsSchema } from "@/shared/components";
import { FormInput } from "@/shared/components";
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from "@/shared/constants";
import type { TranslationFormValue } from "@/shared/types";

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

    const { data, isLoading } = useLocales(DEFAULT_PAGE - 1, MAX_PAGE_SIZE, false);

    const schema = createTranslationsSchema({
        required: t("validation.required"),
    });

    const { control, handleSubmit, reset } = useForm<TranslationsFormValues>({
        defaultValues: {
            translations: [],
        },
        resolver: zodResolver(schema),
    });

    const { fields } = useFieldArray({
        control,
        name: "translations",
    });

    useEffect(() => {
        if (!open || isLoading) {
            return;
        }

        const existingTranslations = new Map(
            value.map((translation) => [translation.language, translation.value]),
        );

        const locales = data?.content ?? [];

        reset({
            translations: locales.map((locale) => ({
                language: locale.code,
                value: existingTranslations.get(locale.code) ?? "",
            })),
        });
    }, [open, isLoading, value, reset, data?.content]);

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
                    disabled={isLoading}
                >
                    {t("common.done")}
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Flex vertical gap="middle">
                    {fields.length === 0 && !isLoading && (
                        <Typography.Text type="secondary">
                            {t("translations.empty")}
                        </Typography.Text>
                    )}

                    {fields.map((field, index) => (
                        <Flex key={field.id} gap="small" align="start">
                            <Input value={field.language} disabled style={{ width: 80 }} />

                            <FormInput
                                control={control}
                                name={`translations.${index}.value`}
                                placeholder={t("translations.valuePlaceholder")}
                            />
                        </Flex>
                    ))}
                </Flex>
            </Form>
        </Modal>
    );
}
