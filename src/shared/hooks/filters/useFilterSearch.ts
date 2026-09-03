import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DEFAULT_DEBOUNCE_DELAY_MS } from "@/shared/constants";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { getFilterValue } from "@/shared/lib";
import type { FilterFieldConfig } from "@/shared/types";

interface UseFilterSearchParams<TFilters extends object> {
    fields: FilterFieldConfig[];
    initialValues: TFilters;
    emptyValues: TFilters;
    onChange: (values: TFilters) => void;
    onReset: () => void;
}

export function useFilterSearch<TFilters extends object>({
    fields,
    initialValues,
    emptyValues,
    onChange,
    onReset,
}: UseFilterSearchParams<TFilters>) {
    const { control, reset } = useForm<TFilters>({
        values: initialValues,
    });

    const values = useWatch({
        control,
    });

    const debouncedValues = useDebouncedValue(values, DEFAULT_DEBOUNCE_DELAY_MS);

    useEffect(() => {
        if (!debouncedValues) {
            return;
        }

        const isDebouncedValueCurrent = fields.every(
            ({ name }) => getFilterValue(values, name) === getFilterValue(debouncedValues, name),
        );

        if (!isDebouncedValueCurrent) {
            return;
        }

        const hasChanges = fields.some(
            ({ name }) => getFilterValue(values, name) !== getFilterValue(initialValues, name),
        );

        if (!hasChanges) {
            return;
        }

        onChange(debouncedValues as TFilters);
    }, [debouncedValues, fields, initialValues, onChange, values]);

    const handleReset = () => {
        reset(emptyValues);
        onReset();
    };

    return {
        control,
        handleReset,
    };
}
