import { WindowsOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/app/auth";

import styles from "./LoginPage.module.scss";

const { Title } = Typography;

export function LoginPage() {
    const { t } = useTranslation("app");
    const { signIn } = useAuth();

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <Title level={3} className={styles.title}>
                    {t("login.title")}
                </Title>

                <Button type="primary" block icon={<WindowsOutlined />} onClick={signIn}>
                    {t("login.signIn")}
                </Button>
            </Card>
        </div>
    );
}
