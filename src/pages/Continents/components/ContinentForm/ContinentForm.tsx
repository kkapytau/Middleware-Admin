import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form } from "antd";
import { useTranslation } from "react-i18next";

import {
    type ContinentFormValues,
    createContinentFormSchema,
    defaultContinentFormValues,
} from "@/entities/continent";
import { FormInput } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useEntityForm, useTranslationsForm } from "@/shared/hooks";

interface ContinentFormProps {
    defaultValues?: ContinentFormValues;
    onSubmit: (values: ContinentFormValues) => Promise<void>;
}

export function ContinentForm({ defaultValues, onSubmit }: ContinentFormProps) {
    const { t } = useTranslation("app");

    const continentFormSchema = createContinentFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    const { control, handleSubmit, setValue } = useEntityForm<ContinentFormValues>({
        defaultValues: defaultContinentFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(continentFormSchema),
    });

    const {
        translations,
        translationsOpen,
        setTranslationsOpen,
        handleTranslationsDone,
        handleTranslationsCancel,
    } = useTranslationsForm({
        control,
        setValue,
    });

    return (
        <>
            <Form id="continent-form" layout="vertical" onFinish={handleFormFinish}>
                <FormInput
                    control={control}
                    name="code"
                    label={t("form.code")}
                    placeholder={t("form.enterCode")}
                    maxLength={MAX_CODE_LENGTH}
                    uppercase
                />

                <FormInput
                    control={control}
                    name="name"
                    label={t("form.name")}
                    placeholder={t("form.enterName")}
                />

                <Flex justify="flex-start">
                    <Button type="default" onClick={() => setTranslationsOpen(true)}>
                        🌐 {t("translations.manage")}
                    </Button>
                </Flex>
            </Form>

            <TranslationsModal
                key={translationsOpen ? "open" : "closed"}
                open={translationsOpen}
                value={translations ?? []}
                onDone={handleTranslationsDone}
                onCancel={handleTranslationsCancel}
            />
        </>
    );
}
