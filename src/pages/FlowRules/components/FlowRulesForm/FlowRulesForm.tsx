import { Form, Input, Switch } from "antd";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAllFlows } from "@/entities/flow";
import type { FlowRuleFormValues } from "@/entities/flowRule";
import { FormInput, FormSelect } from "@/shared/components/form";

interface FlowRuleFormProps {
    control: Control<FlowRuleFormValues>;
}

export function FlowRulesForm({ control }: FlowRuleFormProps) {
    const { t } = useTranslation("app");

    const { data: flows = [], isLoading: flowsLoading } = useAllFlows();

    const flowsOptions = flows.map((flow) => ({
        value: flow.id,
        label: `${flow.code} — ${flow.name}`,
    }));

    return (
        <>
            <FormInput
                control={control}
                name="name"
                label={t("form.flowRuleName")}
                placeholder={t("form.flowRuleNamePlaceholder")}
            />

            <FormSelect
                control={control}
                name="flowId"
                label={t("form.flow")}
                placeholder={t("form.flowPlaceholder")}
                options={flowsOptions}
                loading={flowsLoading}
                allowClear
                showSearch
            />

            <Controller
                name="enabled"
                control={control}
                render={({ field }) => (
                    <Form.Item label={t("form.enabled")}>
                        <Switch checked={field.value} onChange={field.onChange} />
                    </Form.Item>
                )}
            />

            <Controller
                name="config"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.flowRuleConfig")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message ?? t("form.flowRuleConfigHelp")}
                    >
                        <Input.TextArea
                            value={JSON.stringify(field.value, null, 2)}
                            onChange={(event) => {
                                try {
                                    const parsed: unknown = JSON.parse(event.target.value);

                                    if (
                                        typeof parsed !== "object" ||
                                        parsed === null ||
                                        Array.isArray(parsed)
                                    ) {
                                        field.onChange(event.target.value);
                                        return;
                                    }

                                    field.onChange(parsed);
                                } catch {
                                    field.onChange(event.target.value);
                                }
                            }}
                            autoSize={{
                                minRows: 10,
                                maxRows: 24,
                            }}
                            placeholder={t("form.flowRuleConfigPlaceholder")}
                            spellCheck={false}
                        />
                    </Form.Item>
                )}
            />
        </>
    );
}
