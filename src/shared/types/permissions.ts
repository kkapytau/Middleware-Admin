export type Permission = string;

export const permissions = {
    airport: {
        read: "AIRPORT_READ",
        write: "AIRPORT_WRITE",
        delete: "AIRPORT_DELETE",
    },

    country: {
        read: "COUNTRY_READ",
    },

    city: {
        read: "CITY_READ",
    },
} as const;
