import { DownloadOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import { useTranslation } from "react-i18next";

interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
    loading?: boolean;
}

export function DownloadButton({ loading, ...props }: DownloadButtonProps) {
    const { t } = useTranslation("app");

    return (
        <Button icon={<DownloadOutlined />} loading={loading} {...props}>
            {t("actions.download")}
        </Button>
    );
}
