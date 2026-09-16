import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createCurrencyFormSchema,
    type Currency,
    type CurrencyFormValues,
    type CurrencyRequestValues,
    defaultCurrencyFormValues,
    useCreateCurrency,
    useUpdateCurrency,
} from "@/entities/currency";
import { CurrencyForm } from "@/pages/Currencies/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";

interface CurrencyDrawerProps {
    open: boolean;
    currency?: Currency;
    onClose: () => void;
}

export function CurrencyDrawer({ open, currency, onClose }: CurrencyDrawerProps) {
    const { t } = useTranslation("app");

    const createCurrency = useCreateCurrency();
    const updateCurrency = useUpdateCurrency();

    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: CurrencyFormValues): CurrencyRequestValues => ({
        code: values.code,
        deleted: values.deleted,
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: currency,
        createMutation: createCurrency,
        updateMutation: updateCurrency,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<CurrencyFormValues | undefined>(
        () =>
            currency
                ? {
                      code: currency.code,
                      deleted: currency.deleted,
                  }
                : undefined,
        [currency],
    );

    const currencyFormSchema = createCurrencyFormSchema({
        required: t("validation.required"),
        currencyCodePattern: t("validation.currencyCodePattern"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<CurrencyFormValues>({
        open,
        defaultValues: defaultCurrencyFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(currencyFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="currency-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.currencies"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.currencies"),
                      })
            }
            onClose={onClose}
        >
            <CurrencyForm isEditing={isEditing} control={control} />
        </EntityDrawer>
    );
}
