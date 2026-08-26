import { FilterOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import type { ReactNode } from "react";

interface FilterButtonProps {
    label: ReactNode;
    activeCount?: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export function FilterButton({
    label,
    activeCount = 0,
    open,
    onOpenChange,
    children,
}: FilterButtonProps) {
    return (
        <Popover
            trigger="click"
            placement="bottomLeft"
            open={open}
            onOpenChange={onOpenChange}
            content={children}
        >
            <Badge count={activeCount} size="small">
                <Button icon={<FilterOutlined />}>{label}</Button>
            </Badge>
        </Popover>
    );
}
