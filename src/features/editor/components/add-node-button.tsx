import { NodeSelector } from "@/components/node-selector"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"

export const AddNodeButton = memo(() => {
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)
    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
            <Button variant='outline' className="bg-background" size='icon' onClick={() => { }}>
                <PlusIcon />
            </Button>
        </NodeSelector>
    )
})

