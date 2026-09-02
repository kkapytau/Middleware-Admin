import { SearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/shared/components/form";
import { SearchWidget } from "@/shared/components/SearchWidget";
import { useCodeNameSearch } from "@/shared/hooks";
import type { CodeNameFilters } from "@/shared/types/filters";

interface CodeNameSearchProps {
    initialValues: CodeNameFilters;
    onChange: (values: CodeNameFilters) => void;
    onReset: () => void;
}

export function CodeNameSearch({ initialValues, onChange, onReset }: CodeNameSearchProps) {
    const { control, handleReset } = useCodeNameSearch({
        initialValues,
        onChange,
        onReset,
    });

    const { t } = useTranslation("app");

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
