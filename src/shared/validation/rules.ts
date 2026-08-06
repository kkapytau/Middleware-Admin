import type { Rule } from "antd/es/form";

export function requiredRule(message: string): Rule {
    return {
        required: true,
        message,
    };
}

export function emailRule(message: string): Rule {
    return {
        type: "email",
        message,
    };
}

export function passwordRule(message: string): Rule {
    return {
        min: 8,
        message,
    };
}
