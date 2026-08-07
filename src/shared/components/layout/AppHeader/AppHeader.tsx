import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import { logout } from "@/app/auth";
import { appRoutes, getRouteByPath } from "@/app/routes";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";

import styles from "./AppHeader.module.scss";

const { Header } = Layout;

export function AppHeader() {
    const { t } = useTranslation("app");

    const location = useLocation();
    const navigate = useNavigate();

    const currentRoute = getRouteByPath(appRoutes, location.pathname);

    function handleLogout() {
        logout();

        void navigate("/login", { replace: true });
    }

    return (
        <Header className={styles.header}>
            <Typography.Title level={3}>
                {currentRoute ? t(currentRoute.titleKey) : ""}
            </Typography.Title>

            <Space size={12}>
                <LanguageSwitcher />

                <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                    {t("actions.logout")}
                </Button>
            </Space>
        </Header>
    );
}
