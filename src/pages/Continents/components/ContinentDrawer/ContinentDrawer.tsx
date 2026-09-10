import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type ContinentDetail,
    type ContinentFormValues,
    type ContinentRequestValues,
    createContinentFormSchema,
    defaultContinentFormValues,
    useCreateContinent,
    useUpdateContinent,
} from "@/entities/continent";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

import { ContinentForm } from "../ContinentForm";

interface ContinentDrawerProps {
    open: boolean;
    continent?: ContinentDetail;
    onClose: () => void;
}

export function ContinentDrawer({ open, continent, onClose }: ContinentDrawerProps) {
    const { t } = useTranslation("app");

    const createContinent = useCreateContinent();
    const updateContinent = useUpdateContinent();
    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: ContinentFormValues): ContinentRequestValues => ({
        ...values,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: continent,
        createMutation: createContinent,
        updateMutation: updateContinent,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<ContinentFormValues | undefined>(
        () =>
            continent
                ? {
                      code: continent.code,
                      name: continent.name,
                      translations: mapTranslationsToForm(continent.translations),
                  }
                : undefined,
        [continent],
    );

    const continentFormSchema = createContinentFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<ContinentFormValues>({
        open,
        defaultValues: defaultContinentFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(continentFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="continent-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.continent"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.continent"),
                      })
            }
            onClose={onClose}
        >
            <ContinentForm control={control} setValue={setValue} />
        </EntityDrawer>
    );
}
