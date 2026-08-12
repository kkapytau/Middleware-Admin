import type { FlowFunction } from "../model";

export const flowFunctionMocks: FlowFunction[] = [
    {
        id: crypto.randomUUID(),
        name: "currencyByMarketRAM",
        values: [
            {
                key: "FR",
                value: "EUR",
            },
            {
                key: "US",
                value: "USD",
            },
            {
                key: "CA",
                value: "CAD",
            },
        ],
    },
    {
        id: crypto.randomUUID(),
        name: "enableMealsByMarketRAM",
        values: [
            {
                key: "FR",
                value: "true",
            },
            {
                key: "US",
                value: "false",
            },
            {
                key: "MA",
                value: "true",
            },
        ],
    },
];
