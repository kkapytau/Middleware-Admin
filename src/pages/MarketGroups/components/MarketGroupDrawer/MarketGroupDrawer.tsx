import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createMarketGroupFormSchema,
    defaultMarketGroupFormValues,
    type MarketGroup,
    type MarketGroupFormValues,
    type MarketGroupRequestValues,
    useCreateMarketGroup,
    useMarketGroup,
    useUpdateMarketGroup,
} from "@/entities/marketGroup";
import { MarketGroupForm } from "@/pages/MarketGroups/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

interface MarketGroupDrawerProps {
    open: boolean;
    entityName: string;
    marketGroup?: MarketGroup;
    onClose: () => void;
}

export function MarketGroupDrawer({
    open,
    marketGroup,
    onClose,
    entityName,
}: MarketGroupDrawerProps) {
    const { t } = useTranslation("app");

    const createMarketGroup = useCreateMarketGroup();
    const updateMarketGroup = useUpdateMarketGroup();

    const { handleError } = useMutationErrorHandler();

    const marketGroupId = marketGroup?.id ?? null;

    const { data: marketGroupDetail, isLoading: isLoadingMarketGroup } =
        useMarketGroup(marketGroupId);

    const transformValues = (values: MarketGroupFormValues): MarketGroupRequestValues => ({
        code: values.code,
        disabled: values.disabled,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: marketGroup,
        createMutation: createMarketGroup,
        updateMutation: updateMarketGroup,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<MarketGroupFormValues | undefined>(
        () =>
            marketGroupDetail
                ? {
                      code: marketGroupDetail.code,
                      disabled: marketGroupDetail.disabled,
                      translations: mapTranslationsToForm(marketGroupDetail.translations),
                  }
                : undefined,
        [marketGroupDetail],
    );

    const marketGroupFormSchema = createMarketGroupFormSchema({
        required: t("validation.required"),
        marketGroupCodePattern: t("validation.marketGroupCodePattern"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<MarketGroupFormValues>({
        open,
        defaultValues: defaultMarketGroupFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(marketGroupFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            entityName={entityName}
            open={open}
            loading={isEditing && isLoadingMarketGroup}
            submitting={isSubmitting}
            formId="market-group-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.marketGroups"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.marketGroups"),
                      })
            }
            onClose={onClose}
        >
            <MarketGroupForm
                entityName={entityName}
                isEditing={isEditing}
                control={control}
                setValue={setValue}
            />
        </EntityDrawer>
    );
}
