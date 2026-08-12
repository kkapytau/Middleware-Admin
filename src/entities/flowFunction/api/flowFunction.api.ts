import type { FlowFunction, FlowFunctionFormValues } from "../model";
import { flowFunctionMocks } from "./mocks";

const NETWORK_DELAY = 500;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFlowFunctions(): Promise<FlowFunction[]> {
    await delay(NETWORK_DELAY);

    return flowFunctionMocks;
}

export async function createFlowFunction(values: FlowFunctionFormValues): Promise<FlowFunction> {
    await delay(NETWORK_DELAY);

    const newFlowFunction: FlowFunction = {
        id: crypto.randomUUID(),
        name: values.name,
        values: values.values,
    };

    flowFunctionMocks.push(newFlowFunction);

    return newFlowFunction;
}

export interface UpdateFlowFunctionParams {
    id: string;

    values: FlowFunctionFormValues;
}

export async function updateFlowFunction({
    id,
    values,
}: UpdateFlowFunctionParams): Promise<FlowFunction> {
    await delay(NETWORK_DELAY);

    const index = flowFunctionMocks.findIndex((flowFunction) => flowFunction.id === id);

    if (index === -1) {
        throw new Error(`Function "${id}" not found`);
    }

    const updatedFlowFunction: FlowFunction = {
        id,
        name: values.name,
        values: values.values,
    };

    flowFunctionMocks[index] = updatedFlowFunction;

    return updatedFlowFunction;
}

export async function deleteFlowFunction(id: string): Promise<void> {
    await delay(NETWORK_DELAY);

    const index = flowFunctionMocks.findIndex((flowFunction) => flowFunction.id === id);

    if (index === -1) {
        throw new Error(`Function "${id}" not found`);
    }

    flowFunctionMocks.splice(index, 1);
}
