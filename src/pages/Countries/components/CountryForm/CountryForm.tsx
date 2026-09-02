import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form } from "antd";
import { useTranslation } from "react-i18next";

import { useContinents } from "@/entities/continent";
import {
    type CountryFormValues,
    createCountryFormSchema,
    defaultCountryFormValues,
} from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants/validation";
import { useEntityForm, useTranslationsForm } from "@/shared/hooks";

interface CountryFormProps {
    defaultValues?: CountryFormValues;
    onSubmit: (values: CountryFormValues) => Promise<void>;
}

export function CountryForm({ defaultValues, onSubmit }: CountryFormProps) {
    const { t } = useTranslation("app");

    const { data: continents = [], isLoading: isContinentsLoading } = useContinents();

    const countryFormSchema = createCountryFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const continentsOptions = continents.map((continent) => ({
        value: continent.id,
        label: `${continent.code} - ${continent.name}`,
    }));

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    const { control, handleSubmit, setValue } = useEntityForm<CountryFormValues>({
        defaultValues: defaultCountryFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(countryFormSchema),
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
            <Form id="country-form" layout="vertical" onFinish={handleFormFinish}>
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

                <FormSelect
                    control={control}
                    name="continentId"
                    label={t("form.continent")}
                    placeholder={t("form.selectContinent")}
                    options={continentsOptions}
                    loading={isContinentsLoading}
                    allowClear
                    showSearch
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
