import { Form } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type AirportFormValues,defaultAirportFormValues } from "@/entities/airport/model";
import { useCities } from "@/entities/city";
import { FormCheckbox, FormInput, FormSelect } from "@/shared/components/form";

export interface AirportFormRef {
    submit: () => void;
}

interface AirportFormProps {
    defaultValues?: AirportFormValues;

    onSubmit: (values: AirportFormValues) => void | Promise<void>;
}

export const AirportForm = forwardRef<AirportFormRef, AirportFormProps>(function AirportForm(
    { defaultValues = defaultAirportFormValues, onSubmit },
    ref,
) {
    const { t } = useTranslation("app");

    const { data: cities = [], isLoading } = useCities();

    const cityOptions = cities.map((city) => ({
        value: city.cityCode,
        label: city.cityName,
    }));

    const { control, handleSubmit } = useForm<AirportFormValues>({
        defaultValues,
    });

    useImperativeHandle(ref, () => ({
        submit() {
            void handleSubmit(onSubmit)();
        },
    }));

    return (
        <Form
            layout="horizontal"
            colon={false}
            labelCol={{ flex: "110px" }}
            wrapperCol={{ flex: 1 }}
        >
            <FormInput
                control={control}
                name="airportCode"
                label={t("form.airportCode")}
                placeholder={t("form.enterAirportCode")}
                inputProps={{
                    maxLength: 3,
                }}
            />

            <FormInput
                control={control}
                name="airportName"
                label={t("form.airportName")}
                placeholder={t("form.enterAirportName")}
            />

            <FormSelect
                control={control}
                name="cityId"
                label={t("form.city")}
                placeholder={t("form.selectCity")}
                options={cityOptions}
                loading={isLoading}
                allowClear
                showSearch
            />

            <FormInput
                control={control}
                name="latitude"
                label={t("form.latitude")}
                placeholder={t("form.enterLatitude")}
                inputProps={{
                    type: "number",
                }}
            />

            <FormInput
                control={control}
                name="longitude"
                label={t("form.longitude")}
                placeholder={t("form.enterLongitude")}
                inputProps={{
                    type: "number",
                }}
            />

            <FormCheckbox control={control} name="isMetropolitan">
                {t("form.metropolitan")}
            </FormCheckbox>
        </Form>
    );
});
