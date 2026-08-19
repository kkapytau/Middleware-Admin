import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface EntityToolbarProps {
    entity: string;
    onAdd: () => void;
}

export function EntityToolbar({ entity, onAdd }: EntityToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity,
                })}
            </Button>
        </Flex>
    );
}
