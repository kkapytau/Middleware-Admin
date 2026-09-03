export interface FlowFunction {
    id: number;
    name: string;
}

interface FlowFunctionValue {
    key: string;
    value: string;
}

export interface FlowFunctionDetail extends FlowFunction {
    values: FlowFunctionValue[];
}
