import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createGeographicTypeFormSchema,
    defaultGeographicTypeFormValues,
    type GeographicType,
    type GeographicTypeFormValues,
    type GeographicTypeRequestValues,
    useCreateGeographicType,
    useUpdateGeographicType,
} from "@/entities/geographicType";
import { GeographicTypeForm } from "@/pages/GeographicTypes/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";

interface GeographicTypeDrawerProps {
    open: boolean;
    entityName: string;
    geographicType?: GeographicType;
    onClose: () => void;
}

export function GeographicTypeDrawer({
    open,
    geographicType,
    onClose,
    entityName,
}: GeographicTypeDrawerProps) {
    const { t } = useTranslation("app");

    const createGeographicType = useCreateGeographicType();
    const updateGeographicType = useUpdateGeographicType();

    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: GeographicTypeFormValues): GeographicTypeRequestValues => ({
        code: values.code,
        disabled: values.disabled,
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: geographicType,
        createMutation: createGeographicType,
        updateMutation: updateGeographicType,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<GeographicTypeFormValues | undefined>(
        () =>
            geographicType
                ? {
                      code: geographicType.code,
                      disabled: geographicType.disabled,
                  }
                : undefined,
        [geographicType],
    );

    const geographicTypeFormSchema = createGeographicTypeFormSchema({
        required: t("validation.required"),
        geographicTypeCodePattern: t("validation.geographicTypeCodePattern"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<GeographicTypeFormValues>({
        open,
        defaultValues: defaultGeographicTypeFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(geographicTypeFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            entityName={entityName}
            open={open}
            submitting={isSubmitting}
            formId="geographic-type-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.geographicTypes"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.geographicTypes"),
                      })
            }
            onClose={onClose}
        >
            <GeographicTypeForm entityName={entityName} isEditing={isEditing} control={control} />
        </EntityDrawer>
    );
}
