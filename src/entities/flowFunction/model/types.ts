export interface FlowFunction {
    id: number;
    name: string;
}

export interface FlowFunctionValue {
    key: string;
    value: string;
}

export interface FlowFunctionDetail extends FlowFunction {
    values: FlowFunctionValue[];
}
