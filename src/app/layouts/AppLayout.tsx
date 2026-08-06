import { Button, Layout } from "antd";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/app/auth";

const { Header, Content } = Layout;

type Props = {
    children: ReactNode;
};

export function AppLayout({ children }: Props) {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleLogout = () => {
        signOut();

        void navigate("/login", {
            replace: true,
        });
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Button onClick={handleLogout}>Logout</Button>
            </Header>

            <Content>{children}</Content>
        </Layout>
    );
}
