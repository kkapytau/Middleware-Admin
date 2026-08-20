import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { isConflictError } from "@/shared/api";

export function useMutationErrorHandler() {
    const { t } = useTranslation("app");
    const handleError = (error: unknown, conflictMessage: string): boolean => {
        if (isConflictError(error)) {
            notification.error({
                title: t("actions.error"),
                description: conflictMessage,
            });

            return true;
        }

        return false;
    };

    return {
        handleError,
    };
}
