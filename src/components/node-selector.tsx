import { NodeType } from "@/generated/prisma/enums"
import { GlobeIcon, MousePointerIcon } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator";


export type NodeTypeOptions = {
    type: NodeType;
    label: string;
    description: string;
    icon: string | React.ComponentType<{ className?: string }>
}

const triggerNodes: NodeTypeOptions[] = [{
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger manually",
    description: "Run the flow on clicking a button. Good for getting started quickly",
    icon: MousePointerIcon
}]
const executionNodes: NodeTypeOptions[] = [{
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Makes an HTTP Request",
    icon: GlobeIcon
}]

interface INodeSelectorProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}
export const NodeSelector = ({ open, onOpenChange, children }: INodeSelectorProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        What triggers this workflow?
                    </SheetTitle>
                    <SheetDescription>
                        A trigger is a step that starts your workflow
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {triggerNodes.map((nodeType) => (
                        <div key={nodeType.type}
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2
                                 border-transparent hover:border-l-primary"
                            onClick={() => { }}
                        >
                            <div className="flex items-center gap-6 w-full overflow-hidden">

                                {typeof nodeType.icon === "string" ?
                                    (
                                        <img
                                            src={nodeType.icon}
                                            alt={nodeType.label}
                                            className="size-5 object-contain rounded-sm"
                                        />
                                    ) : (
                                        <nodeType.icon className="size-5" />
                                    )}
                                <div className="flex flex-col items-start text-left">
                                    <span className="font-medium text-sm">
                                        {nodeType.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {nodeType.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Separator />
                <div>
                    {executionNodes.map((nodeType) => (
                        <div key={nodeType.type}
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2
                                 border-transparent hover:border-l-primary"
                            onClick={() => { }}
                        >
                            <div className="flex items-center gap-6 w-full overflow-hidden">

                                {typeof nodeType.icon === "string" ?
                                    (
                                        <img
                                            src={nodeType.icon}
                                            alt={nodeType.label}
                                            className="size-5 object-contain rounded-sm"
                                        />
                                    ) : (
                                        <nodeType.icon className="size-5" />
                                    )}
                                <div className="flex flex-col items-start text-left">
                                    <span className="font-medium text-sm">
                                        {nodeType.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {nodeType.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}