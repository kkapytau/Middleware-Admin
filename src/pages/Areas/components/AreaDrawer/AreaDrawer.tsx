import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type AreaDetail,
    type AreaFormValues,
    type AreaRequestValues,
    createAreaFormSchema,
    defaultAreaFormValues,
    useCreateArea,
    useUpdateArea,
} from "@/entities/area";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

import { AreaForm } from "../AreaForm";

interface AreaDrawerProps {
    open: boolean;
    area?: AreaDetail;
    onClose: () => void;
}

export function AreaDrawer({ open, area, onClose }: AreaDrawerProps) {
    const { t } = useTranslation("app");

    const createArea = useCreateArea();
    const updateArea = useUpdateArea();
    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: AreaFormValues): AreaRequestValues => ({
        ...values,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: area,
        createMutation: createArea,
        updateMutation: updateArea,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<AreaFormValues | undefined>(
        () =>
            area
                ? {
                      code: area.code,
                      name: area.name,
                      geographicTypeId: area.geographicType.id,
                      deleted: area.deleted,
                      translations: mapTranslationsToForm(area.translations),
                  }
                : undefined,
        [area],
    );

    const areaFormSchema = createAreaFormSchema({
        required: t("validation.required"),
        areaCodePattern: t("validation.areaCodePattern"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<AreaFormValues>({
        open,
        defaultValues: defaultAreaFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(areaFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
            formId="area-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.area"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.area"),
                      })
            }
            onClose={onClose}
        >
            <AreaForm isEditing={isEditing} control={control} setValue={setValue} />
        </EntityDrawer>
    );
}
