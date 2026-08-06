import { Layout } from "antd";
import { Outlet } from "react-router";

const { Header, Sider, Content } = Layout;

export function AppLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={260}>Sidebar</Sider>

            <Layout>
                <Header>Header</Header>

                <Content style={{ padding: 24 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
