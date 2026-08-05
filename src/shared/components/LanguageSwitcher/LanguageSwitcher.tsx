import { GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { useTranslation } from "react-i18next";

import { languages } from "@/app/i18n/languages";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const items: MenuProps["items"] = languages.map((language) => ({
        key: language.code,
        nativeName: language.nativeName,
    }));

    const handleClick: MenuProps["onClick"] = ({ key }) => {
        void i18n.changeLanguage(key);
    };

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleClick,
            }}
            trigger={["click"]}
        >
            <Button icon={<GlobalOutlined />}>{i18n.resolvedLanguage?.toUpperCase()}</Button>
        </Dropdown>
    );
}
