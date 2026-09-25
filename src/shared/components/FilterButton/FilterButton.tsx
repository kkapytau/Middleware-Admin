import { FilterOutlined } from "@ant-design/icons";
import { Badge, Button, Popover, type PopoverProps } from "antd";
import type { ReactNode } from "react";

interface FilterButtonProps {
    label: ReactNode;
    testId: string;
    activeCount?: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    placement?: PopoverProps["placement"];
}

export function FilterButton({
    label,
    activeCount = 0,
    open,
    onOpenChange,
    placement = "bottomLeft",
    testId,
    children,
}: FilterButtonProps) {
    return (
        <Popover
            trigger="click"
            placement={placement}
            open={open}
            onOpenChange={onOpenChange}
            content={children}
        >
            <Badge count={activeCount} size="small">
                <Button data-testid={testId} icon={<FilterOutlined />}>
                    {label}
                </Button>
            </Badge>
        </Popover>
    );
}
