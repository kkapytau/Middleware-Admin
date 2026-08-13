import type { FlowFunction } from "../model";

export function findFlowFunction(
    flowFunctions: FlowFunction[],
    name: string,
): FlowFunction | undefined {
    return flowFunctions.find((flowFunction) => flowFunction.name === name);
}
