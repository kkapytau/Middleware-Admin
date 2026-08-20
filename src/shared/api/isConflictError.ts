import { HTTPError } from "ky";

export function isConflictError(error: unknown): boolean {
    return error instanceof HTTPError && error.response.status === 409;
}
