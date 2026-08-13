import type { FlowFunction } from "../model";

export function resolveFlowFunction(flowFunction: FlowFunction, key: string): string | undefined {
    return flowFunction.values.find((item) => item.key === key)?.value;
}
