import type { City } from "../model";
import { cityMocks } from "./mocks";

const NETWORK_DELAY = 500;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCities(): Promise<City[]> {
    await delay(NETWORK_DELAY);

    return cityMocks;
}
