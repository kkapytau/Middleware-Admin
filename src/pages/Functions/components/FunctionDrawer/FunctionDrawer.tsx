import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createFlowFunctionFormSchema,
    defaultFlowFunctionFormValues,
    type FlowFunction,
    type FlowFunctionDetail,
    type FlowFunctionFormValues,
    useCreateFlowFunction,
    useUpdateFlowFunction,
} from "@/entities/flowFunction";
import { FunctionForm } from "@/pages/Functions/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
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

    const defaultValues = useMemo<FlowFunctionFormValues | undefined>(
        () =>
            flowFunction
                ? {
                      name: flowFunction.name,
                      values: flowFunction.values,
                  }
                : undefined,
        [flowFunction],
    );

    const schema = createFlowFunctionFormSchema({
        functionNameRequired: t("validation.functionNameRequired"),
        keyRequired: t("validation.keyRequired"),
        valueRequired: t("validation.valueRequired"),
        duplicateKey: t("validation.duplicateKey"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<FlowFunctionFormValues>({
        open,
        defaultValues: defaultFlowFunctionFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(schema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            onSubmit={handleFormFinish}
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
            <FunctionForm control={control} />
        </EntityDrawer>
    );
}
