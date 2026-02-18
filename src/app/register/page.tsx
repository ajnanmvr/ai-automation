import RegisterForm from "@/components/auth/RegisterForm";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function RegisterPage() {
    await requireUnAuth()
    return <RegisterForm />
}