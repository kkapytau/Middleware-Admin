import type { Airport } from "../model";
import { airportMocks } from "./mocks";

const NETWORK_DELAY = 500;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAirports(): Promise<Airport[]> {
    await delay(NETWORK_DELAY);

    return airportMocks;
}
