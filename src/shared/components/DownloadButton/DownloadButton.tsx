import { DownloadOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import { useTranslation } from "react-i18next";

interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
    loading?: boolean;
    testId: string;
}

export function DownloadButton({ loading, testId, ...props }: DownloadButtonProps) {
    const { t } = useTranslation("app");

    return (
        <Button data-testid={testId} icon={<DownloadOutlined />} loading={loading} {...props}>
            {t("actions.download")}
        </Button>
    );
}
