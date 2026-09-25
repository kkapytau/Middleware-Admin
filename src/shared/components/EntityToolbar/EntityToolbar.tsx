import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { usePermissions } from "@/app/auth";

interface EntityToolbarProps {
    entity: string;
    onAdd: () => void;
    testId: string;
    actions?: React.ReactNode;
}

export function EntityToolbar({ entity, onAdd, actions, testId }: EntityToolbarProps) {
    const { t } = useTranslation("app");

    const { canCreate } = usePermissions();

    return (
        <Flex justify="space-between" align="center">
            <Flex gap="small">{actions}</Flex>

            {canCreate && (
                <Button
                    data-testid={testId}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                    style={{ marginLeft: "auto" }}
                >
                    {t("actions.addEntity", {
                        entity,
                    })}
                </Button>
            )}
        </Flex>
    );
}
