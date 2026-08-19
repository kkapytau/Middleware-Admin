import { useTranslation } from "react-i18next";

import {
    type FlowFunctionDetail,
    type FlowFunctionFormValues,
    useCreateFlowFunction,
    useUpdateFlowFunction,
} from "@/entities/flowFunction";
import { FunctionForm } from "@/pages/Functions/components/FunctionForm";
import { EntityDrawer } from "@/shared/components/EntityDrawer";

interface FunctionDrawerProps {
    open: boolean;
    flowFunction?: FlowFunctionDetail;
    onClose: () => void;
}

export function FunctionDrawer({ open, flowFunction, onClose }: FunctionDrawerProps) {
    const { t } = useTranslation("app");

    const createFlowFunction = useCreateFlowFunction();
    const updateFlowFunction = useUpdateFlowFunction();

    const isEditing = Boolean(flowFunction);

    const isSubmitting = createFlowFunction.isPending || updateFlowFunction.isPending;

    const handleSubmit = async (values: FlowFunctionFormValues) => {
        if (flowFunction) {
            await updateFlowFunction.mutateAsync({
                id: flowFunction.id,
                values,
            });
        } else {
            await createFlowFunction.mutateAsync(values);
        }

        onClose();
    };

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="function-form"
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.function"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.function"),
                      })
            }
            onClose={onClose}
        >
            <FunctionForm
                defaultValues={
                    flowFunction
                        ? {
                              name: flowFunction.name,
                              values: flowFunction.values,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}
