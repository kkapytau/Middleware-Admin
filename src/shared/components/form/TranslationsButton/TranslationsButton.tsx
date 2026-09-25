import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

import { AUTOMATION_ID } from "@/shared/lib";

import type { TranslationsButtonProps } from "./TranslationsButton.types";

export const TranslationsButton = ({
    onClick,
    disabled = false,
    entityName,
}: TranslationsButtonProps) => {
    const { t } = useTranslation("app");

    return (
        <Flex justify="flex-start">
            <Button
                data-testid={AUTOMATION_ID.formTranslationActivator(entityName)}
                type="default"
                disabled={disabled}
                onClick={onClick}
            >
                🌐 {t("translations.manage")}
            </Button>
        </Flex>
    );
};
