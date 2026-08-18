import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface CountriesToolbarProps {
    onCreate: () => void;
}

export function CountriesToolbar({ onCreate }: CountriesToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
                {t("actions.addEntity", {
                    entity: t("navigation.countries"),
                })}
            </Button>
        </Flex>
    );
}
