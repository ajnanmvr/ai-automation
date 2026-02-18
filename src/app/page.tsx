import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"

export default async function page() {
  await requireAuth()

  const data = await caller.getUsers()

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
