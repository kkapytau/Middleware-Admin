import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    createTimezoneFormSchema,
    defaultTimezoneFormValues,
    type Timezone,
    type TimezoneFormValues,
    type TimezoneRequestValues,
    useCreateTimezone,
    useUpdateTimezone,
} from "@/entities/timezone";
import { TimezoneForm } from "@/pages/Timezones/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";

interface TimezoneDrawerProps {
    open: boolean;
    timezone?: Timezone;
    onClose: () => void;
}

export function TimezoneDrawer({ open, timezone, onClose }: TimezoneDrawerProps) {
    const { t } = useTranslation("app");

    const createTimezone = useCreateTimezone();
    const updateTimezone = useUpdateTimezone();

    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: TimezoneFormValues): TimezoneRequestValues => ({
        code: values.code,
        utcOffset: values.utcOffset,
        disabled: values.disabled,
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: timezone,
        createMutation: createTimezone,
        updateMutation: updateTimezone,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<TimezoneFormValues | undefined>(
        () =>
            timezone
                ? {
                      code: timezone.code,
                      utcOffset: timezone.utcOffset,
                      disabled: timezone.disabled,
                  }
                : undefined,
        [timezone],
    );

    const timezoneFormSchema = createTimezoneFormSchema({
        required: t("validation.required"),
        timezoneCodeLength: t("validation.timezoneCodeLength"),
        timezoneCodeFormat: t("validation.timezoneCodeFormat"),
        utcOffsetFormat: t("validation.utcOffsetFormat"),
    });

    const { control, handleSubmit: handleRHFSubmit } = useEntityForm<TimezoneFormValues>({
        open,
        defaultValues: defaultTimezoneFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(timezoneFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            loading={false}
            submitting={isSubmitting}
            formId="timezone-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.timezones"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.timezones"),
                      })
            }
            onClose={onClose}
        >
            <TimezoneForm isEditing={isEditing} control={control} />
        </EntityDrawer>
    );
}
