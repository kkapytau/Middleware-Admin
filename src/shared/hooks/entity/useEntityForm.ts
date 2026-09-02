import { useEffect } from "react";
import { type DefaultValues, type FieldValues, useForm, type UseFormProps } from "react-hook-form";

interface UseEntityFormParams<T extends FieldValues> {
    defaultValues: DefaultValues<T>;
    initialValues?: DefaultValues<T>;
    resolver: UseFormProps<T>["resolver"];
}

export function useEntityForm<T extends FieldValues>({
    defaultValues,
    initialValues,
    resolver,
}: UseEntityFormParams<T>) {
    const form = useForm<T>({
        defaultValues: initialValues ?? defaultValues,
        resolver,
    });

    const { reset } = form;

    useEffect(() => {
        reset(initialValues ?? defaultValues);
    }, [defaultValues, initialValues, reset]);

    return form;
}
