import { useTranslation } from "react-i18next";

import { type Flow, type FlowFormValues, useCreateFlow, useUpdateFlow } from "@/entities/flow";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { identity } from "@/shared/lib";

import { FlowForm } from "../FlowForm";

interface FlowDrawerProps {
    open: boolean;
    flow?: Flow;
    onClose: () => void;
}

export function FlowDrawer({ open, flow, onClose }: FlowDrawerProps) {
    const { t } = useTranslation("app");

    const createFlow = useCreateFlow();
    const updateFlow = useUpdateFlow();
    const { handleError } = useMutationErrorHandler();

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation<Flow, FlowFormValues>({
        entity: flow,
        createMutation: createFlow,
        updateMutation: updateFlow,
        transform: identity,
        onClose,
        handleError,
    });

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="flow-form"
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.flow"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.flow"),
                      })
            }
            onClose={onClose}
        >
            <FlowForm defaultValues={flow} onSubmit={handleSubmit} />
        </EntityDrawer>
    );
}
