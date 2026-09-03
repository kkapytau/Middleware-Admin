import { useTranslation } from "react-i18next";

import {
    type FlowFunction,
    type FlowFunctionDetail,
    type FlowFunctionFormValues,
    useCreateFlowFunction,
    useUpdateFlowFunction,
} from "@/entities/flowFunction";
import { FunctionForm } from "@/pages/Functions/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { identity } from "@/shared/lib";

interface FunctionDrawerProps {
    open: boolean;
    flowFunction?: FlowFunctionDetail;
    onClose: () => void;
}

export function FunctionDrawer({ open, flowFunction, onClose }: FunctionDrawerProps) {
    const { t } = useTranslation("app");

    const createFlowFunction = useCreateFlowFunction();
    const updateFlowFunction = useUpdateFlowFunction();
    const { handleError } = useMutationErrorHandler();

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation<
        FlowFunction,
        FlowFunctionFormValues
    >({
        entity: flowFunction,
        createMutation: createFlowFunction,
        updateMutation: updateFlowFunction,
        transform: identity,
        onClose,
        handleError,
    });

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
