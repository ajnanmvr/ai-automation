import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export const AddNodeButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Button variant='outline' className="bg-background" size='icon' onClick={onClick}>
            <PlusIcon />
        </Button>
    )
}

