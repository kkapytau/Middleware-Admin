import { parseFlowFunctionExpression } from "@/entities/flowFunction";

import type { FlowFunction } from "../model";
import { findFlowFunction } from "./findFlowFunction";
import { resolveFlowFunction } from "./resolveFlowFunction";

export function resolveFlowFunctionExpression(
    expression: string,
    flowFunctions: FlowFunction[],
    request: Record<string, unknown>,
): string | undefined {
    const parsed = parseFlowFunctionExpression(expression);

    if (!parsed) {
        return undefined;
    }

    const flowFunction = findFlowFunction(flowFunctions, parsed.functionName);

    if (!flowFunction) {
        return undefined;
    }

    const key = request[parsed.argument];

    if (typeof key !== "string") {
        return undefined;
    }

    return resolveFlowFunction(flowFunction, key);
}
