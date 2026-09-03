import { SearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import type { Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInput, FormSelect } from "@/shared/components";
import { SearchWidget } from "@/shared/components";
import { useFilterSearch } from "@/shared/hooks";
import type { FilterFieldConfig } from "@/shared/types";

interface FilterSearchProps<TFilters extends object> {
    fields: FilterFieldConfig[];
    initialValues: TFilters;
    emptyValues: TFilters;
    onChange: (values: TFilters) => void;
    onReset: () => void;
}

export function FilterSearch<TFilters extends object>({
    fields,
    initialValues,
    emptyValues,
    onChange,
    onReset,
}: FilterSearchProps<TFilters>) {
    const { t } = useTranslation("app");

    const { control, handleReset } = useFilterSearch({
        fields,
        initialValues,
        emptyValues,
        onChange,
        onReset,
    });

    return (
        <SearchWidget onReset={handleReset}>
            <Flex gap="middle">
                {fields.map((field) => {
                    switch (field.type) {
                        case "text":
                            return (
                                <FormInput
                                    key={field.name}
                                    control={control}
                                    name={field.name as Path<TFilters>}
                                    label={t(field.labelKey)}
                                    placeholder={
                                        field.placeholderKey ? t(field.placeholderKey) : undefined
                                    }
                                    prefix={<SearchOutlined />}
                                />
                            );

                        case "boolean":
                            return (
                                <FormSelect
                                    key={field.name}
                                    control={control}
                                    name={field.name as Path<TFilters>}
                                    label={t(field.labelKey)}
                                    options={[
                                        {
                                            value: "",
                                            label: t(field.allLabelKey),
                                        },
                                        {
                                            value: true,
                                            label: t(field.trueLabelKey),
                                        },
                                        {
                                            value: false,
                                            label: t(field.falseLabelKey),
                                        },
                                    ]}
                                />
                            );
                    }
                })}
            </Flex>
        </SearchWidget>
    );
}
