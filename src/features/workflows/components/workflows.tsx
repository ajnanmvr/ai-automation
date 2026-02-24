"use client";
import EntityHeader, { EntityContainer, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";


export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return <div>{JSON.stringify(workflows.data, null, 2)}</div>;
}


const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const upgradeModal = useUpgradeModal()

  const router = useRouter()
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        upgradeModal.handleError(error)
      }
    }
    )
  }
  return (
    <>
      {upgradeModal.modal}

      <EntityHeader
        title="Workflows"
        description="Create and manage workflows"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        onNew={handleCreate}
        newButtonLabel="New Workflow"
      />
    </>
  )
}

const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams })
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workflows"
    />
  )
}


export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowSearch />}
    >
      {children}
    </EntityContainer>
  )
}