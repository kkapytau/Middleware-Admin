export const hasActiveFilters = <T extends object>(obj: T): boolean =>
    Object.values(obj).some(Boolean);
