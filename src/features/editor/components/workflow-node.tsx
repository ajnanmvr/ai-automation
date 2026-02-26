import { Button } from "@/components/ui/button"
import { NodeToolbar, Position } from "@xyflow/react"
import { SettingsIcon, TrashIcon } from "lucide-react"

interface WorkflowNodeProps {
    children: React.ReactNode;
    showToolbar?: boolean;
    onDelete?: () => void;
    onSettings?: () => void;
    name?: string;
    description?: string;
}
export function WorkflowNode({
    children,
    showToolbar,
    onDelete,
    onSettings,
    name,
    description

}: WorkflowNodeProps) {
    return (
        <>

            {showToolbar && (
                <NodeToolbar>
                    <Button onClick={onSettings} size='sm' variant='ghost'>
                        <SettingsIcon />
                    </Button>
                    <Button onClick={onDelete} size='sm' variant='ghost'>
                        <TrashIcon />
                    </Button>
                </NodeToolbar>
            )}
            {children}

            {name && (
                <NodeToolbar position={Position.Bottom}
                    isVisible
                    className="max-w-[200px] text-center"
                >
                    <p className="font-medium">{name}</p>
                    {description && (
                        <p className="text-muted-foreground truncate text-sm">
                            {description}
                        </p>
                    )}
                </NodeToolbar>
            )}
        </>
    )
}
