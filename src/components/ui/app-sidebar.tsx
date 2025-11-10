import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  type IconProps as TablerIconProps, // Import TablerIconProps
} from "@tabler/icons-react"
import type { LucideProps } from "lucide-react"; // Import LucideProps


import { NavDocuments, NavMain, NavSecondary, NavUser } from "@/nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar1Icon } from "lucide-react"

// Define a union type for supported icon components
type IconComponent = React.FC<TablerIconProps> | React.FC<LucideProps>;

// Define types for better type safety
interface NavItem {
  title: string;
  url: string;
  icon?: IconComponent; // Use the union type for icons
  items?: { title: string; url: string; icon?: IconComponent }[]; // Use the union type for icons
}

interface NavCloudItem {
  title: string;
  icon?: IconComponent; // Use the union type for icons
  isActive?: boolean;
  url: string;
  items?: { title: string; url: string }[];
}

interface NavSecondaryItem {
  title: string;
  url: string;
  icon?: IconComponent; // Use the union type for icons
}

interface DocumentItem {
  name: string;
  url: string;
  icon?: IconComponent; // Use the union type for icons
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Data {
  user: User;
  navMain: NavItem[];
  navClouds: NavCloudItem[];
  navSecondary: NavSecondaryItem[];
  documents: DocumentItem[];
}

const data: Data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
      items: [
        { title: "Overview", url: "#overview", icon: IconChartBar },
        { title: "Calender", url: "#calender", icon: Calendar1Icon },
      ],
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
      items: [
        { title: "Active", url: "#projects/active" },
        { title: "Archived", url: "#projects/archived" },
      ],
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
