import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { memo } from "react";
import { WorkflowNode } from "@/features/editor/components/workflow-node";

export const InitialNode = memo((props: NodeProps) => {
    return (
        <WorkflowNode showToolbar={false}>
            <PlaceholderNode
                {...props}
            >
                <div className="cursor-pointer flex items-center justify-center">
                    <PlusIcon className="size-4" />
                </div>
            </PlaceholderNode>
        </WorkflowNode>
    )
})
InitialNode.displayName = "InitialNode"