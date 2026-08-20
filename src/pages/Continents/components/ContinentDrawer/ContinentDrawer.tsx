import { useTranslation } from "react-i18next";

import {
    type ContinentDetail,
    type ContinentFormValues,
    useCreateContinent,
    useUpdateContinent,
} from "@/entities/continent";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";

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

    const isEditing = Boolean(continent);
    const isSubmitting = createContinent.isPending || updateContinent.isPending;

    const handleSubmit = async (values: ContinentFormValues) => {
        try {
            if (continent) {
                await updateContinent.mutateAsync({
                    id: continent.id,
                    values,
                });
            } else {
                await createContinent.mutateAsync(values);
            }

            onClose();
        } catch (error) {
            if (handleError(error, t("errors.createConflict"))) {
                return;
            }

            throw error;
        }
    };

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
                              translations: continent.translations,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}
