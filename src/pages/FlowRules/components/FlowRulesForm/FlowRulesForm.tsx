import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Switch } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAllFlows } from "@/entities/flow";
import {
    createFlowRuleFormSchema,
    defaultFlowRuleFormValues,
    type FlowRuleFormValues,
} from "@/entities/flowRule";
import { FormInput, FormSelect } from "@/shared/components/form";
import { useEntityForm } from "@/shared/hooks";

import styles from "./FlowRulesForm.module.scss";

interface FlowRuleFormProps {
    defaultValues?: FlowRuleFormValues;
    onSubmit: (values: FlowRuleFormValues) => Promise<void>;
}

export function FlowRulesForm({ defaultValues, onSubmit }: FlowRuleFormProps) {
    const { t } = useTranslation("app");

    const flowRuleFormSchema = createFlowRuleFormSchema({
        required: t("validation.required"),
        flowRuleNameMaxLength: t("validation.flowRuleNameMaxLength"),
    });

    const { data: flows = [], isLoading: flowsLoading } = useAllFlows();

    const [configValue, setConfigValue] = useState(() =>
        JSON.stringify(defaultValues?.config ?? defaultFlowRuleFormValues.config, null, 2),
    );

    const [configError, setConfigError] = useState<string>();

    const flowsOptions = flows.map((flow) => ({
        value: flow.id,
        label: `${flow.code} — ${flow.name}`,
    }));

    const handleFormFinish = () => {
        void handleSubmit(async (values) => {
            let config: Record<string, unknown>;

            try {
                const parsed: unknown = JSON.parse(configValue);

                if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
                    setConfigError(t("validation.flowRuleConfigObject"));
                    return;
                }

                config = parsed as Record<string, unknown>;
            } catch {
                setConfigError(t("validation.flowRuleConfigJson"));
                return;
            }

            if (typeof config.URL !== "string" || config.URL.trim().length === 0) {
                setConfigError(t("validation.flowRuleConfigUrl"));
                return;
            }

            setConfigError(undefined);

            await onSubmit({
                ...values,
                config,
            });
        })();
    };

    const { control, handleSubmit } = useEntityForm<FlowRuleFormValues>({
        defaultValues: defaultFlowRuleFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(flowRuleFormSchema),
    });

    return (
        <Form
            id="flow-rule-form"
            layout="vertical"
            onFinish={handleFormFinish}
            className={styles.form}
        >
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

            <Form.Item
                label={t("form.flowRuleConfig")}
                validateStatus={configError ? "error" : undefined}
                help={configError ?? t("form.flowRuleConfigHelp")}
            >
                <Input.TextArea
                    value={configValue}
                    onChange={(event) => {
                        setConfigValue(event.target.value);
                        setConfigError(undefined);
                    }}
                    autoSize={{
                        minRows: 10,
                        maxRows: 24,
                    }}
                    placeholder={t("form.flowRuleConfigPlaceholder")}
                    spellCheck={false}
                />
            </Form.Item>
        </Form>
    );
}
