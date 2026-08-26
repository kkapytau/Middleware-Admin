import type { PageResponse } from "@/shared/api/pageResponse";

const DEFAULT_PAGE_SIZE = 50;

export async function getAllPages<T>(
    getPage: (page: number, size: number) => Promise<PageResponse<T>>,
    compareFn: (a: T, b: T) => number,
    size = DEFAULT_PAGE_SIZE,
): Promise<T[]> {
    const firstPage = await getPage(0, size);

    if (firstPage.totalPages === 1) {
        return [...firstPage.content].sort(compareFn);
    }

    const remainingPages = await Promise.all(
        Array.from({ length: firstPage.totalPages - 1 }, (_, index) => getPage(index + 1, size)),
    );

    return [...firstPage.content, ...remainingPages.flatMap((response) => response.content)].sort(
        compareFn,
    );
}
