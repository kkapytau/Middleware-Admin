export interface FlowFunctionValue {
    key: string;

    value: string;
}

export interface FlowFunction {
    id: string;

    name: string;

    values: FlowFunctionValue[];
}
