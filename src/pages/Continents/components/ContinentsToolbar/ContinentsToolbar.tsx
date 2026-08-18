import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface ContinentsToolbarProps {
    onCreate: () => void;
}

export function ContinentsToolbar({ onCreate }: ContinentsToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
                {t("actions.addEntity", {
                    entity: t("navigation.continent"),
                })}
            </Button>
        </Flex>
    );
}
