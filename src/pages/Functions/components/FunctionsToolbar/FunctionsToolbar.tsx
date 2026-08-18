import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface FunctionsToolbarProps {
    onAdd: () => void;
}

export function FunctionsToolbar({ onAdd }: FunctionsToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.function"),
                })}
            </Button>
        </Flex>
    );
}
