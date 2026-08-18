import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface AirportsToolbarProps {
    onAdd: () => void;
}

export function AirportsToolbar(props: AirportsToolbarProps) {
    const { t } = useTranslation("app");
    const { onAdd } = props;

    return (
        <Flex justify="flex-end">
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.airports"),
                })}
            </Button>
        </Flex>
    );
}
