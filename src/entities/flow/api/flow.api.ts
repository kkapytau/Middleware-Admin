import type { Flow, FlowFormValues } from "../model";
import { flowMocks } from "./mocks";

const NETWORK_DELAY = 500;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFlows(): Promise<Flow[]> {
    await delay(NETWORK_DELAY);

    return flowMocks;
}

export async function createFlow(values: FlowFormValues): Promise<Flow> {
    await delay(NETWORK_DELAY);

    const newFlow: Flow = {
        id: Math.max(0, ...flowMocks.map((flow) => flow.id)) + 1,
        code: values.code,
        name: values.name,
    };

    flowMocks.push(newFlow);

    return newFlow;
}

export interface UpdateFlowParams {
    id: number;
    values: FlowFormValues;
}

export async function updateFlow({ id, values }: UpdateFlowParams): Promise<Flow> {
    await delay(NETWORK_DELAY);

    const index = flowMocks.findIndex((flow) => flow.id === id);

    if (index === -1) {
        throw new Error(`Flow "${id}" not found`);
    }

    const updatedFlow: Flow = {
        id,
        code: values.code,
        name: values.name,
    };

    flowMocks[index] = updatedFlow;

    return updatedFlow;
}

export async function deleteFlow(id: number): Promise<void> {
    await delay(NETWORK_DELAY);

    const index = flowMocks.findIndex((flow) => flow.id === id);

    if (index === -1) {
        throw new Error(`Flow "${id}" not found`);
    }

    flowMocks.splice(index, 1);
}
