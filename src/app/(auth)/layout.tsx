import AuthLayout from "@/components/auth/AuthLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthLayout>{children}</AuthLayout>
    );
}
