import { Tag } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
    metropolitan: boolean;
}

export function MetropolitanTag({ metropolitan }: Props) {
    const { t } = useTranslation("app");

    return metropolitan ? (
        <Tag color="green">{t("statuses.metropolitan")}</Tag>
    ) : (
        <Tag color="default">{t("statuses.regional")}</Tag>
    );
}
