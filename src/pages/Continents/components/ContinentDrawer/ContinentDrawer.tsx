import { useTranslation } from "react-i18next";

import {
    type ContinentDetail,
    type ContinentFormValues,
    type ContinentRequestValues,
    useCreateContinent,
    useUpdateContinent,
} from "@/entities/continent";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib/translations/mapTranslationsToApi";
import { mapTranslationsToForm } from "@/shared/lib/translations/mapTranslationsToForm";

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

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="continent-form"
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
            <ContinentForm
                defaultValues={
                    continent
                        ? {
                              code: continent.code,
                              name: continent.name,
                              translations: mapTranslationsToForm(continent.translations),
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}
