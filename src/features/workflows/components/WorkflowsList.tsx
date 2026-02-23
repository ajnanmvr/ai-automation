"use client";
import { useSuspenseWorkflows } from "../hooks/useWorkflows";

export default function WorkflowsList() {
  const workflows = useSuspenseWorkflows();
  return <div>{JSON.stringify(workflows.data)}</div>;
}
