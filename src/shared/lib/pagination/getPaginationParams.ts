import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/shared/constants/pagination";

export interface PaginationParams {
    page: number;
    pageSize: number;
}

export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("size"));

    return {
        page: Number.isInteger(page) && page > 0 ? page : DEFAULT_PAGE,
        pageSize: Number.isInteger(pageSize) && pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE,
    };
}
