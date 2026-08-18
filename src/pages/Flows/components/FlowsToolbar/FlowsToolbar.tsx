import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface FlowsToolbarProps {
    onAdd: () => void;
}

export function FlowsToolbar({ onAdd }: FlowsToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.flow"),
                })}
            </Button>
        </Flex>
    );
}
