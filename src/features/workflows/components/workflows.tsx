"use client";
import EntityHeader, { EntityContainer } from "@/components/EntityComponents";
import { useSuspenseWorkflows } from "../hooks/useWorkflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return <div>{JSON.stringify(workflows.data)}</div>;
}


export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <EntityHeader
      title="Workflows"
      description="Create and manage workflows"
      disabled={disabled}
      isCreating={false}
      onNew={() => { console.log("new workflow") }}
      newButtonLabel="New Workflow"
    />
  )
}


export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
    >
      {children}
    </EntityContainer>
  )
}