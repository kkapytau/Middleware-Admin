import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
    type AirportFormValues,
    createAirportFormSchema,
    defaultAirportFormValues,
} from "@/entities/airport/model";
import { useCities } from "@/entities/city";
import { FormCheckbox, FormInput, FormNumberInput, FormSelect } from "@/shared/components/form";

interface AirportFormProps {
    id?: string;
    defaultValues?: AirportFormValues;
    onSubmit: (values: AirportFormValues) => void | Promise<void>;
}

export function AirportForm({ id, defaultValues, onSubmit }: AirportFormProps) {
    const { t } = useTranslation("app");

    const { data: cities = [], isLoading: citiesLoading } = useCities();

    const airportFormSchema = createAirportFormSchema({
        required: t("validation.required"),
        airportCodeLength: t("validation.airportCodeLength"),
        latitudeRange: t("validation.latitudeRange"),
        longitudeRange: t("validation.longitudeRange"),
    });

    const { control, handleSubmit } = useForm<AirportFormValues>({
        defaultValues: defaultValues ?? defaultAirportFormValues,
        resolver: zodResolver(airportFormSchema),
    });

    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: `${city.code} — ${city.name}`,
    }));

    return (
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
                    inputProps={{
                        maxLength: 3,
                    }}
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
            </form>
        </Form>
    );
}
