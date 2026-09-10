import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createFlowRuleFormSchema,
    defaultFlowRuleFormValues,
    type FlowRule,
    type FlowRuleFormValues,
    useCreateFlowRule,
    useUpdateFlowRule,
} from "@/entities/flowRule";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { identity } from "@/shared/lib";

import { FlowRulesForm } from "../FlowRulesForm";

interface FlowRuleDrawerProps {
    open: boolean;
    flowRule?: FlowRule;
    onClose: () => void;
}

export function FlowRulesDrawer({ open, flowRule, onClose }: FlowRuleDrawerProps) {
    const { t } = useTranslation("app");

    const createFlowRule = useCreateFlowRule();
    const updateFlowRule = useUpdateFlowRule();
    const { handleError } = useMutationErrorHandler();

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation<
        FlowRule,
        FlowRuleFormValues
    >({
        entity: flowRule,
        createMutation: createFlowRule,
        updateMutation: updateFlowRule,
        transform: identity,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<FlowRuleFormValues | undefined>(
        () =>
            flowRule
                ? {
                      name: flowRule.name,
                      flowId: flowRule.flow.id,
                      enabled: flowRule.enabled,
                      config: flowRule.config,
                  }
                : undefined,
        [flowRule],
    );

    const flowRuleFormSchema = useMemo(
        () =>
            createFlowRuleFormSchema({
                required: t("validation.required"),
                flowRuleNameMaxLength: t("validation.flowRuleNameMaxLength"),
            }),
        [t],
    );

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<FlowRuleFormValues>({
        open,
        defaultValues: defaultFlowRuleFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(flowRuleFormSchema),
    });

    const handleFormFinish = (_values: FlowRuleFormValues): Promise<void> =>
        handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer<FlowRuleFormValues>
            open={open}
            submitting={isSubmitting}
            formId="flow-rule-form"
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.flowRule"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.flowRule"),
                      })
            }
            onSubmit={handleFormFinish}
            onClose={onClose}
        >
            <FlowRulesForm control={control} />
        </EntityDrawer>
    );
}
