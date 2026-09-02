import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams";
import { updateSearchParams } from "@/shared/lib/updateSearchParams/updateSearchParams";

export function useUrlPagination() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { page, pageSize } = getPaginationParams(searchParams);

    const apiPage = page - 1;

    const handlePaginationChange = useCallback(
        (nextPage: number, nextPageSize: number) => {
            updateSearchParams(setSearchParams, {
                page: String(nextPage),
                size: String(nextPageSize),
            });
        },
        [setSearchParams],
    );

    return {
        page,
        pageSize,
        apiPage,
        handlePaginationChange,
    };
}
