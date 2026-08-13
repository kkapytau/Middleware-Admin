export interface ParsedFlowFunctionExpression {
    functionName: string;
    argument: string;
}

const FLOW_FUNCTION_PATTERN = /^\|#([a-zA-Z0-9_]+)\(([^)]+)\)\|$/;

export function parseFlowFunctionExpression(
    expression: string,
): ParsedFlowFunctionExpression | undefined {
    const match = expression.match(FLOW_FUNCTION_PATTERN);

    if (!match) {
        return undefined;
    }

    const [, functionName, argument] = match;

    if (!functionName || !argument) {
        return undefined;
    }

    return {
        functionName,
        argument,
    };
}
