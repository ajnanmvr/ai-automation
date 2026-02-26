import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

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
            </SheetContent>
        </Sheet>
    )
}