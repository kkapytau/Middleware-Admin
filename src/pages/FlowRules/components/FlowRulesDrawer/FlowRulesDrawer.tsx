import { useTranslation } from "react-i18next";

import {
    type FlowRule,
    type FlowRuleFormValues,
    useCreateFlowRule,
    useUpdateFlowRule,
} from "@/entities/flowRule";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { identity } from "@/shared/lib/identity/identity";

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

    const defaultValues: FlowRuleFormValues | undefined = flowRule
        ? {
              name: flowRule.name,
              flowId: flowRule.flow.id,
              enabled: flowRule.enabled,
              config: flowRule.config,
          }
        : undefined;

    return (
        <EntityDrawer
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
            onClose={onClose}
        >
            <FlowRulesForm
                key={`${open}-${flowRule?.id ?? "create"}`}
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}
