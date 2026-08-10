import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./AirportsToolbar.module.scss";

interface AirportsToolbarProps {
    onAdd: () => void;
}

export function AirportsToolbar(props: AirportsToolbarProps) {
    const { t } = useTranslation("app");
    const { onAdd } = props;

    return (
        <div className={styles.toolbar}>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.airports"),
                })}
            </Button>
        </div>
    );
}
