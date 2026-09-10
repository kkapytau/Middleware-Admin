import { useEffect } from "react";
import { type DefaultValues, type FieldValues, type Resolver, useForm } from "react-hook-form";

interface UseEntityFormParams<T extends FieldValues> {
    defaultValues: DefaultValues<T>;
    initialValues?: T;
    resolver?: Resolver<T>;
    open: boolean;
}

export function useEntityForm<T extends FieldValues>({
    defaultValues,
    initialValues,
    resolver,
    open,
}: UseEntityFormParams<T>) {
    const form = useForm<T>({
        defaultValues,
        resolver,
    });

    const { reset } = form;

    useEffect(() => {
        if (!open) {
            return;
        }

        reset(initialValues ?? defaultValues);
    }, [open, initialValues, defaultValues, reset]);

    return form;
}
