import { useTranslation } from "react-i18next";

interface EntityMutation<TValues> {
    mutateAsync: (values: TValues) => Promise<unknown>;
    isPending: boolean;
}

interface EntityUpdateMutation<TValues> {
    mutateAsync: (params: { id: number; values: TValues }) => Promise<unknown>;
    isPending: boolean;
}

interface UseEntityMutationParams<
    TEntity extends { id: number },
    TFormValues,
    TApiValues = TFormValues,
> {
    entity?: TEntity;
    createMutation: EntityMutation<TApiValues>;
    updateMutation: EntityUpdateMutation<TApiValues>;
    transform: (values: TFormValues) => TApiValues;
    onClose: () => void;
    handleError: (error: unknown, fallbackMessage: string) => boolean;
}

export function useEntityMutation<
    TEntity extends { id: number },
    TFormValues,
    TApiValues = TFormValues,
>({
    entity,
    createMutation,
    updateMutation,
    transform,
    onClose,
    handleError,
}: UseEntityMutationParams<TEntity, TFormValues, TApiValues>) {
    const { t } = useTranslation("app");
    const isEditing = Boolean(entity);

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (values: TFormValues) => {
        try {
            const apiValues = transform(values);

            if (entity) {
                await updateMutation.mutateAsync({
                    id: entity.id,
                    values: apiValues,
                });
            } else {
                await createMutation.mutateAsync(apiValues);
            }

            onClose();
        } catch (error) {
            if (handleError(error, t("errors.createConflict"))) {
                return;
            }

            throw error;
        }
    };

    return {
        isEditing,
        isSubmitting,
        handleSubmit,
    };
}
