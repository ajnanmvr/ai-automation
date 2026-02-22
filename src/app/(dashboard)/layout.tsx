import AppSideBar from "@/components/AppSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSideBar />
            <SidebarInset className="bg-accent">
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
