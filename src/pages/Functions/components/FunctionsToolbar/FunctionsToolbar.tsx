import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface FunctionsToolbarProps {
    onAdd: () => void;
}

export function FunctionsToolbar({ onAdd }: FunctionsToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
                {t("navigation.functions")}
            </Typography.Title>

            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.function"),
                })}
            </Button>
        </Flex>
    );
}
