import { NodeSelector } from "@/components/node-selector"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"

export const AddNodeButton = memo(({ onClick }: { onClick?: () => void }) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <NodeSelector open={open} onOpenChange={setOpen}>
            <Button variant='outline' className="bg-background" size='icon' onClick={() => { }}>
                <PlusIcon />
            </Button>
        </NodeSelector>
    )
})

