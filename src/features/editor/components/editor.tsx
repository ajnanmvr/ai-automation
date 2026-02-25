"use client"
import { LoadingView } from '@/components/entity-components'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSuspenseWorkflow, useUpdateWorkflowName } from '@/features/workflows/hooks/use-workflows'
import { Button } from '@/components/ui/button'
import { SaveIcon } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Editor = ({ workflowId }: { workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId)
    return (
        <div>{JSON.stringify(workflow, null, 2)}</div>
    )
}

export const EditorLoading = () => {
    return <LoadingView message='Loading editor...' />
}
export const EditorError = () => {
    return <LoadingView message='Error loading editor' />
}

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger />
            <div className='flex flex-row items-center justify-between gap-x-4 w-full'>
                <EditorBreadCrumbs workflowId={workflowId} />
                <EditorSaveButton workflowId={workflowId} />
            </div>
        </header>
    );
}

const EditorBreadCrumbs = ({ workflowId }: { workflowId: string }) => {

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/workflows">
                            Workflows
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <EditorNameInput workflowId={workflowId} />
            </BreadcrumbList>
        </Breadcrumb>
    )
}
const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
    return (
        <div className='ml-auto'>
            <Button size="sm" onClick={() => { console.log("Clicked on Save") }}>
                <SaveIcon className='size-4' />
                Save
            </Button>
        </div>
    )
}
const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId)
    const updateWorkflowName = useUpdateWorkflowName()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string>(workflow.name)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (workflow.name) {
            setName(workflow.name)
        }
    }, [workflow.name])

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const handleSave = () => {
        setIsEditing(false)
        if (name === workflow.name) {
            return;
        }
        updateWorkflowName.mutate({ id: workflowId, name }, {
            onError: () => {
                setName(workflow.name)
            }
        })
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave()
        } else if (e.key === "Escape") {
            setName(workflow.name)
            setIsEditing(false)
        }
    }

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className='h-7 w-auto min-w-[100px] px-2'
            />
        )
    }
    return (
        <BreadcrumbItem onClick={() => setIsEditing(true)}
            className={cn(
                "h-7 flex items-center px-2 text-sm transition-colors",
                updateWorkflowName.isPending && "opacity-50 animate-pulse"
            )}
        >
            {workflow.name}
        </BreadcrumbItem>
    )
}