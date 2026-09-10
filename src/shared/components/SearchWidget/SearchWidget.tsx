import { Button, Flex, Space, Typography } from "antd";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SearchWidgetProps {
    children: ReactNode;
    onReset: () => void;
    onClose: () => void;
}

export function SearchWidget({ children, onReset, onClose }: SearchWidgetProps) {
    const { t } = useTranslation("app");

    return (
        <Flex vertical gap="middle">
            <Typography.Text strong>{t("filters.title")}</Typography.Text>

            {children}

            <Flex justify="flex-end">
                <Space>
                    <Button type="default" onClick={onReset}>
                        {t("filters.reset")}
                    </Button>

                    <Button type="primary" onClick={onClose}>
                        {t("filters.close")}
                    </Button>
                </Space>
            </Flex>
        </Flex>
    );
}
