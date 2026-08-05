export const queryKeys = {
    users: {
        all: ["users"] as const,

        byId: (id: number) => ["users", id] as const,
    },

    roles: {
        all: ["roles"] as const,

        byId: (id: number) => ["roles", id] as const,
    },
};
