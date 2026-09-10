import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import type { UserRole } from "@/app/auth";
import { hasPermission, useAuth } from "@/app/auth";
import { type AppRoute, appRoutes } from "@/app/routes";
import { AppLogo } from "@/shared/components";

import styles from "./AppSidebar.module.scss";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function buildMenuItems(
    routes: AppRoute[],
    t: ReturnType<typeof useTranslation<"app">>["t"],
    roles: readonly UserRole[],
): MenuItem[] {
    return routes.flatMap((route) => {
        if (route.showInNavigation === false) {
            return [];
        }

        if (route.permission && !hasPermission(roles, route.permission)) {
            return [];
        }

        const Icon = route.icon;

        if (route.type === "group") {
            const children = buildMenuItems(route.children, t, roles);

            if (children.length === 0) {
                return [];
            }

            return [
                {
                    key: route.key,
                    label: t(route.titleKey),
                    icon: Icon ? <Icon /> : undefined,
                    children,
                },
            ];
        }

        return [
            {
                key: route.path,
                label: t(route.titleKey),
                icon: Icon ? <Icon /> : undefined,
            },
        ];
    });
}

export function AppSidebar() {
    const { t } = useTranslation("app");

    const { roles } = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const menuItems = useMemo(() => buildMenuItems(appRoutes, t, roles), [t, roles]);

    return (
        <Sider width={260} className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <AppLogo className={styles.sidebarLogo} />
            </div>

            <Menu
                mode="inline"
                theme="dark"
                items={menuItems}
                selectedKeys={[location.pathname]}
                onClick={({ key }) => {
                    void navigate(key);
                }}
            />
        </Sider>
    );
}
