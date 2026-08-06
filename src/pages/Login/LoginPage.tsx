import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useAuth } from "@/app/auth";
import { emailRule, passwordRule, requiredRule } from "@/shared/validation";

import styles from "./LoginPage.module.scss";

type LoginForm = {
    email: string;
    password: string;
};

const { Title } = Typography;

export function LoginPage() {
    const { t } = useTranslation("app");
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = (_values: LoginForm) => {
        signIn("demo-token");

        void navigate("/", {
            replace: true,
        });
    };

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <Title level={3} className={styles.title}>
                    {t("login.title")}
                </Title>

                <Form<LoginForm> layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item
                        name="email"
                        label={t("login.email")}
                        rules={[
                            requiredRule(t("validation.required")),
                            emailRule(t("validation.invalidEmail")),
                        ]}
                    >
                        <Input prefix={<UserOutlined />} autoComplete="email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={t("login.password")}
                        rules={[
                            requiredRule(t("validation.required")),
                            passwordRule(t("validation.passwordLength")),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        {t("login.signIn")}
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
