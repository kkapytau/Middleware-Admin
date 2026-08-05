import { Button, Typography } from "antd";

import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";

const { Title } = Typography;
import { useTranslation } from "react-i18next";

export default function App() {
    const { t } = useTranslation("app");
    const { t: tc } = useTranslation("common");

    return (
        <div style={{ padding: 32 }}>
            <Title>{t("title")}</Title>

            <Button type="primary">{tc("save")}</Button>
            <LanguageSwitcher />
        </div>
    );
}
