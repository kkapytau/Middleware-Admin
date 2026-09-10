import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { FlowRuleFormValues } from "@/entities/flowRule";
import {
    createLocaleFormSchema,
    defaultLocaleFormValues,
    type Locale,
    type LocaleFormValues,
    type LocaleRequestValues,
    useCreateLocale,
    useUpdateLocale,
} from "@/entities/locale";
import { LocaleForm } from "@/pages/Locales/components/LocaleForm";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";

interface LocaleDrawerProps {
    open: boolean;
    locale?: Locale;
    onClose: () => void;
}

export function LocaleDrawer({ open, locale, onClose }: LocaleDrawerProps) {
    const { t } = useTranslation("app");

    const createLocale = useCreateLocale();
    const updateLocale = useUpdateLocale();
    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: LocaleFormValues): LocaleRequestValues => ({
        code: values.code,
        name: values.name,
        deleted: values.deleted,
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: locale,
        createMutation: createLocale,
        updateMutation: updateLocale,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<LocaleFormValues | undefined>(
        () =>
            locale
                ? {
                      code: locale.code,
                      name: locale.name,
                      deleted: locale.deleted,
                  }
                : undefined,
        [locale],
    );

    const localeFormSchema = createLocaleFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<LocaleFormValues>({
        open,
        defaultValues: defaultLocaleFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(localeFormSchema),
    });

    const handleFormFinish = (_values: FlowRuleFormValues): Promise<void> =>
        handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            onSubmit={handleFormFinish}
            submitting={isSubmitting}
            formId="locale-form"
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.locales"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.locales"),
                      })
            }
            onClose={onClose}
        >
            <LocaleForm isEditing={isEditing} control={control} />
        </EntityDrawer>
    );
}
