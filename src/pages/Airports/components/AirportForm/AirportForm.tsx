import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form } from "antd";
import { useTranslation } from "react-i18next";

import {
    type AirportFormValues,
    createAirportFormSchema,
    defaultAirportFormValues,
} from "@/entities/airport/model";
import { useAllCities } from "@/entities/city";
import { FormCheckbox, FormInput, FormNumberInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants/validation";
import { useEntityForm, useTranslationsForm } from "@/shared/hooks";

interface AirportFormProps {
    id?: string;
    defaultValues?: AirportFormValues;
    onSubmit: (values: AirportFormValues) => void | Promise<void>;
}

export function AirportForm({ id, defaultValues, onSubmit }: AirportFormProps) {
    const { t } = useTranslation("app");

    const { data: cities = [], isLoading: citiesLoading } = useAllCities();

    const airportFormSchema = createAirportFormSchema({
        required: t("validation.required"),
        airportCodeLength: t("validation.airportCodeLength"),
        latitudeRange: t("validation.latitudeRange"),
        longitudeRange: t("validation.longitudeRange"),
    });

    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: `${city.code} — ${city.name}`,
    }));

    const { control, handleSubmit, setValue } = useEntityForm<AirportFormValues>({
        defaultValues: defaultAirportFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(airportFormSchema),
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
            <Form
                layout="horizontal"
                labelCol={{ flex: "110px" }}
                wrapperCol={{ flex: 1 }}
                colon={false}
                component={false}
            >
                <form
                    id={id}
                    onSubmit={(event) => {
                        void handleSubmit(onSubmit)(event);
                    }}
                >
                    <FormInput
                        control={control}
                        name="code"
                        label={t("form.airportCode")}
                        placeholder={t("form.enterAirportCode")}
                        maxLength={MAX_CODE_LENGTH + 1}
                        uppercase
                    />

                    <FormInput
                        control={control}
                        name="name"
                        label={t("form.airportName")}
                        placeholder={t("form.enterAirportName")}
                    />

                    <FormSelect
                        control={control}
                        name="cityId"
                        label={t("form.city")}
                        placeholder={t("form.selectCity")}
                        options={cityOptions}
                        loading={citiesLoading}
                        allowClear
                        showSearch
                    />

                    <FormNumberInput
                        control={control}
                        name="latitude"
                        label={t("form.latitude")}
                        placeholder={t("form.enterLatitude")}
                    />

                    <FormNumberInput
                        control={control}
                        name="longitude"
                        label={t("form.longitude")}
                        placeholder={t("form.enterLongitude")}
                    />

                    <FormCheckbox control={control} name="metropolitan">
                        {t("form.metropolitan")}
                    </FormCheckbox>

                    <Flex justify="flex-start">
                        <Button type="default" onClick={() => setTranslationsOpen(true)}>
                            🌐 {t("translations.manage")}
                        </Button>
                    </Flex>
                </form>
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
