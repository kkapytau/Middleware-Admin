import { api } from "@/shared/api";

import type { Session } from "./types";

const ANONYMOUS_SESSION: Session = {
    authenticated: false,
    name: null,
    email: null,
    roles: [],
};

export async function fetchSession(): Promise<Session> {
    try {
        return await api.get("internal/api/v1/me").json<Session>();
    } catch {
        return ANONYMOUS_SESSION;
    }
}

export function login(): void {
    window.location.assign("/oauth2/authorization/azure");
}

/**
 * Logout is a real form POST, not an XHR: the backend answers with a redirect chain through
 * Entra's end_session endpoint, which only a top-level navigation can follow.
 */
export function logout(): void {
    const form = document.createElement("form");

    form.method = "POST";
    form.action = "/logout";

    const csrf = readCookie("XSRF-TOKEN");

    if (csrf) {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = "_csrf";
        input.value = csrf;

        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}

export function readCookie(name: string): string | null {
    const match = document.cookie.split("; ").find((entry) => entry.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.substring(name.length + 1)) : null;
}
