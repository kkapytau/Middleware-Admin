import { SearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import type { Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInput, FormSelect } from "@/shared/components";
import { SearchWidget } from "@/shared/components";
import { useFilterSearch } from "@/shared/hooks";
import type { FilterFieldConfig } from "@/shared/types";

interface FilterSearchProps<TItem extends object, TFilters extends object> {
    fields: FilterFieldConfig<TItem>[];
    initialValues: TFilters;
    emptyValues: TFilters;
    onChange: (values: TFilters) => void;
    onReset: () => void;
    onClose: () => void;
}

export function FilterSearch<TItem extends object, TFilters extends object>({
    fields,
    initialValues,
    emptyValues,
    onChange,
    onReset,
    onClose,
}: FilterSearchProps<TItem, TFilters>) {
    const { t } = useTranslation("app");

    const { control, handleReset } = useFilterSearch({
        fields,
        initialValues,
        emptyValues,
        onChange,
        onReset,
    });

    return (
        <SearchWidget onReset={handleReset} onClose={onClose}>
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
                                <div
                                    key={field.name}
                                    style={field.type === "boolean" ? { width: 150 } : undefined}
                                >
                                    <FormSelect
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
                                </div>
                            );
                    }
                })}
            </Flex>
        </SearchWidget>
    );
}
