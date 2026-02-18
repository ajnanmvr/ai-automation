import LoginForm from "@/components/auth/LoginForm";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function LoginPage() {
    await requireUnAuth()
    return (<LoginForm />)
}