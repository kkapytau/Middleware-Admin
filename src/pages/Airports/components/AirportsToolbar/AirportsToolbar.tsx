import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./AirportsToolbar.module.scss";

export function AirportsToolbar() {
    const { t } = useTranslation("app");

    return (
        <div className={styles.toolbar}>
            <Button type="primary" icon={<PlusOutlined />}>
                {t("actions.addEntity", {
                    entity: t("navigation.airports"),
                })}
            </Button>
        </div>
    );
}
