import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { memo, useState } from "react";
import { WorkflowNode } from "@/features/editor/components/workflow-node";
import { NodeSelector } from "./node-selector";

export const InitialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)

    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
            <WorkflowNode showToolbar={false}>
                <PlaceholderNode
                    {...props}
                    onClick={()=>{setSelectorOpen(true)}}
                >
                    <div className="cursor-pointer flex items-center justify-center">
                        <PlusIcon className="size-4" />
                    </div>
                </PlaceholderNode>
            </WorkflowNode>
        </NodeSelector>
    )
})
InitialNode.displayName = "InitialNode"