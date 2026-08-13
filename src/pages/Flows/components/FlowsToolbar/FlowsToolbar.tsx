import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./FlowsToolbar.module.scss";

interface FlowsToolbarProps {
    onAdd: () => void;
}

export function FlowsToolbar({ onAdd }: FlowsToolbarProps) {
    const { t } = useTranslation("app");

    return (
        <div className={styles.toolbar}>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                {t("actions.addEntity", {
                    entity: t("navigation.flow"),
                })}
            </Button>
        </div>
    );
}
