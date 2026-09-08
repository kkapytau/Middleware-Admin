import { Button, Flex, Typography } from "antd";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SearchWidgetProps {
    children: ReactNode;
    onReset: () => void;
}

export function SearchWidget({ children, onReset }: SearchWidgetProps) {
    const { t } = useTranslation("app");

    return (
        <Flex vertical gap="middle">
            <Typography.Text strong>{t("filters.title")}</Typography.Text>

            {children}

            <Flex justify="flex-end">
                <Button type="default" onClick={onReset}>
                    {t("filters.reset")}
                </Button>
            </Flex>
        </Flex>
    );
}
