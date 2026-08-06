import { Layout } from "antd";
import { Outlet } from "react-router";

import { AppHeader } from "../AppHeader";
import { AppSidebar } from "../AppSidebar";
import styles from "./AppShell.module.scss";

const { Content } = Layout;

export function AppShell() {
    return (
        <Layout className={styles.layout}>
            <AppSidebar />

            <Layout>
                <AppHeader />

                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
