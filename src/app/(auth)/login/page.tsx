import LoginForm from "@/features/auth/components/LoginForm";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function LoginPage() {
  await requireUnAuth();
  return <LoginForm />;
}
