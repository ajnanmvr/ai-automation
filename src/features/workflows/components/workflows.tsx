"use client";
import { EntityHeader, EntityContainer, EntityPagination, EntitySearch, LoadingView, ErrorView, EmptyView, EntityList } from "@/components/entity-components";
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from "next/navigation";
import { useEntitySearch } from "../hooks/use-entity-search";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useWorkflowsParams } from "../hooks/use-workflows-params";


export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <EntityList
      items={workflows.data.items}
      getKey={(item) => item.id}
      renderItems={(item) => (<p>{item.name}</p>)}
      emptyView={<WorkflowsEmpty />}
    />);
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

const WorkflowsSearch = () => {
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

const WorkflowsPagination = () => {
  const [params, setParams] = useWorkflowsParams()
  const workflows = useSuspenseWorkflows()
  return (<EntityPagination

    disabled={workflows.isRefetching}
    totalPages={workflows.data.totalPages}
    page={workflows.data.page}
    onPageChange={(page) => {
      setParams({ ...params, page })
    }}

  />)
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />
}
export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows" />
}
export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow()
  const router = useRouter()
  const upgradeModal = useUpgradeModal()
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
      <EmptyView
        message="You haven't created any workflows yet. Get started by creating your first workflow"
        onNew={handleCreate} />
    </>
  )
}