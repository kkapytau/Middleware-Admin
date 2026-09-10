import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createFlowFormSchema,
    defaultFlowFormValues,
    type Flow,
    type FlowFormValues,
    useCreateFlow,
    useUpdateFlow,
} from "@/entities/flow";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
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

    const defaultValues = useMemo<FlowFormValues | undefined>(
        () =>
            flow
                ? {
                      code: flow.code,
                      name: flow.name,
                  }
                : undefined,
        [flow],
    );

    const flowFormSchema = createFlowFormSchema({
        required: t("validation.required"),
        flowCodeMinLength: t("validation.flowCodeMinLength"),
        flowCodeMaxLength: t("validation.flowCodeMaxLength"),
        flowNameMaxLength: t("validation.flowNameMaxLength"),
        flowCodePattern: t("validation.flowCodePattern"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<FlowFormValues>({
        open,
        defaultValues: defaultFlowFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(flowFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            onSubmit={handleFormFinish}
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
            <FlowForm control={control} />
        </EntityDrawer>
    );
}
