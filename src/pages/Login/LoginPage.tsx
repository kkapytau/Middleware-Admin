import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { login } from "@/app/auth";

type LoginForm = {
    username: string;
    password: string;
};

const { Title } = Typography;

export function LoginPage() {
    const { t } = useTranslation("app");
    const navigate = useNavigate();

    const handleSubmit = ({ username, password }: LoginForm) => {
        if (!username.trim() || !password.trim()) {
            return;
        }

        login("demo-token");

        void navigate("/", {
            replace: true,
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
            }}
        >
            <Card
                style={{
                    width: 420,
                }}
            >
                <Title
                    level={3}
                    style={{
                        textAlign: "center",
                        marginBottom: 32,
                    }}
                >
                    {t("login.title")}
                </Title>

                <Form<LoginForm> layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="username"
                        label={t("login.username")}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} autoComplete="username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={t("login.password")}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
                    </Form.Item>

                    <Button htmlType="submit" type="primary" block>
                        {t("login.signIn")}
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
