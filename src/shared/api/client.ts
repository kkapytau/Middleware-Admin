import ky from "ky";

import { readCookie } from "@/app/auth";

export const api = ky.create({
    // "/" anchors the slash-less endpoint constants at the origin root on every page depth.
    prefix: import.meta.env.VITE_API_URL || "/",

    timeout: 10_000,

    retry: 0,

    // The auth cookie is httpOnly and same-origin; explicit so an absolute VITE_API_URL can never
    // silently drop it.
    credentials: "same-origin",

    headers: {
        Accept: "application/json",
    },

    hooks: {
        beforeRequest: [
            ({ request }) => {
                const csrf = readCookie("XSRF-TOKEN");
                if (csrf) {
                    request.headers.set("X-XSRF-TOKEN", csrf);
                }
            },
        ],
        afterResponse: [
            ({ request, response }) => {
                if (
                    response.status === 401 &&
                    !request.url.endsWith("/internal/api/v1/me") &&
                    window.location.pathname !== "/login"
                ) {
                    window.location.assign("/login");
                }
            },
        ],
    },
});
