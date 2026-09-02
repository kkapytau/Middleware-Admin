import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DEFAULT_DEBOUNCE_DELAY_MS } from "@/shared/constants/timing";
import { useDebouncedValue } from "@/shared/hooks";
import type { CodeNameFilters } from "@/shared/types/filters";

interface UseCodeNameSearchParams {
    initialValues: CodeNameFilters;
    onChange: (values: CodeNameFilters) => void;
    onReset: () => void;
}

const EMPTY_FILTERS: CodeNameFilters = {
    code: "",
    name: "",
};

export function useCodeNameSearch({ initialValues, onChange, onReset }: UseCodeNameSearchParams) {
    const { control, reset } = useForm<CodeNameFilters>({
        values: initialValues,
    });

    const values = useWatch({
        control,
    });

    const debouncedValues = useDebouncedValue(values, DEFAULT_DEBOUNCE_DELAY_MS);

    useEffect(() => {
        const currentValues: CodeNameFilters = {
            code: values.code ?? "",
            name: values.name ?? "",
        };

        const nextValues: CodeNameFilters = {
            code: debouncedValues?.code ?? "",
            name: debouncedValues?.name ?? "",
        };

        const isDebouncedValueCurrent =
            currentValues.code === nextValues.code && currentValues.name === nextValues.name;

        if (!isDebouncedValueCurrent) {
            return;
        }

        if (nextValues.code === initialValues.code && nextValues.name === initialValues.name) {
            return;
        }

        onChange(nextValues);
    }, [debouncedValues, initialValues, onChange, values]);

    const handleReset = () => {
        reset(EMPTY_FILTERS);
        onReset();
    };

    return {
        control,
        handleReset,
    };
}
