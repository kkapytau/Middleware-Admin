import { useTranslation } from "react-i18next";

import { type Flow, type FlowFormValues, useCreateFlow, useUpdateFlow } from "@/entities/flow";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";

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

    const isEditing = Boolean(flow);

    const isSubmitting = createFlow.isPending || updateFlow.isPending;

    const handleSubmit = async (values: FlowFormValues) => {
        try {
            if (flow) {
                await updateFlow.mutateAsync({
                    id: flow.id,
                    values,
                });
            } else {
                await createFlow.mutateAsync(values);
            }

            onClose();
        } catch (error) {
            if (handleError(error, t("errors.createConflict"))) {
                return;
            }

            throw error;
        }
    };

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
