import { SearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/shared/components/form";
import { SearchWidget } from "@/shared/components/SearchWidget";
import { DEFAULT_DEBOUNCE_DELAY_MS } from "@/shared/constants/timing";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

export interface CountryFilters {
    code: string;
    name: string;
}

interface CountriesSearchProps {
    initialValues: CountryFilters;
    onChange: (values: CountryFilters) => void;
    onReset: () => void;
}

const EMPTY_FILTERS: CountryFilters = {
    code: "",
    name: "",
};

export function CountriesSearch({ initialValues, onChange, onReset }: CountriesSearchProps) {
    const { t } = useTranslation("app");

    const { control, reset } = useForm<CountryFilters>({
        values: initialValues,
    });

    const values = useWatch({
        control,
    });

    const debouncedValues = useDebouncedValue(values, DEFAULT_DEBOUNCE_DELAY_MS);

    useEffect(() => {
        const currentValues: CountryFilters = {
            code: values.code ?? "",
            name: values.name ?? "",
        };

        const nextValues: CountryFilters = {
            code: debouncedValues?.code ?? "",
            name: debouncedValues?.name ?? "",
        };

        const isDebouncedValueCurrent =
            currentValues.code === nextValues.code && currentValues.name === nextValues.name;

        if (!isDebouncedValueCurrent) {
            return;
        }

        if (nextValues.code === initialValues.code && nextValues.name === initialValues.name) {
            return;
        }

        onChange(nextValues);
    }, [debouncedValues, initialValues, onChange, values]);

    const handleReset = () => {
        reset(EMPTY_FILTERS);
        onReset();
    };

    return (
        <SearchWidget onReset={handleReset}>
            <Flex gap="middle">
                <FormInput
                    control={control}
                    name="code"
                    label={t("columns.code")}
                    prefix={<SearchOutlined />}
                />

                <FormInput
                    control={control}
                    name="name"
                    label={t("columns.name")}
                    prefix={<SearchOutlined />}
                />
            </Flex>
        </SearchWidget>
    );
}
