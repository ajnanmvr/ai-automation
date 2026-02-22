import RegisterForm from "@/features/auth/components/RegisterForm";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function RegisterPage() {
    await requireUnAuth()
    return <RegisterForm />
}