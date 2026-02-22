"use client"

import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const menuItems = [{
    title: "Workflows",
    items: [{
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows"
    },
    {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials"
    },
    {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions"
    },
    ]
}]
export default function AppSideBar() {
    const pathName = usePathname()
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href='/' className="flex items-center gap-2 self-center ">
                            <Image src={'/logos/logo.svg'} alt="logo" height={30} width={30} />
                            <span className="font-semibold text-sm">Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                        isActive={
                                            item.url === "/" ?
                                                pathName === "/" :
                                                pathName.startsWith(item.url)
                                        }
                                        tooltip={item.title}
                                        className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Upgrade to Pro"
                            className="gap-x-4 h-10 px-4">
                            <StarIcon className="h-4 w-4" /> <span>Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Billing Portal"
                            className="gap-x-4 h-10 px-4">
                            <CreditCardIcon className="h-4 w-4" /> <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Logout"
                            className="gap-x-4 h-10 px-4 text-red-500">
                            <LogOutIcon className="h-4 w-4" /> <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
