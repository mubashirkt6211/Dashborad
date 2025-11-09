"use client"

import { /* Button */ } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconMoon, IconChartBar, IconDatabase, IconSettings, IconPlus, IconLogout, IconChevronLeft } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface SiteHeaderProps {
  ticketId?: string;
  ticketTitle?: string;
}

export function SiteHeader({ ticketId = "192", ticketTitle = "All Details" }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme()

  // theme toggling handled in the dropdown

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <IconChevronLeft className="h-4 w-4" />
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground">{ticketId} {ticketTitle}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle dark / light"
          >
            {theme === "dark" ? (
              <IconSun className="size-4" />
            ) : (
              <IconMoon className="size-4" />
            )}
          </Button> */}

          {/* User avatar with profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Open profile menu">
                <Avatar>
                  <AvatarImage src="https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg" alt="User avatar" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg" alt="User avatar" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Mubashir</div>
                    <div className="text-xs text-muted-foreground">mubashir@.com</div>
                  </div>
                  <div>
                    <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium">PRO</span>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  // toggle theme
                  const next = theme === "dark" ? "light" : "dark"
                  setTheme(next)
                }}
              >
                <IconMoon className="size-4" />
                <span className="ml-2">Dark Mode</span>
                <span className="ml-auto">
                  <button
                    className={`h-5 w-9 rounded-full p-0.5 transition-colors ${
                      theme === "dark" ? "bg-primary" : "bg-muted"
                    }`}
                    aria-pressed={theme === "dark"}
                    onClick={(e) => {
                      e.stopPropagation()
                      const next = theme === "dark" ? "light" : "dark"
                      setTheme(next)
                    }}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        theme === "dark" ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconChartBar className="size-4" />
                <span className="ml-2">Activity</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconDatabase className="size-4" />
                <span className="ml-2">Integrations</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings className="size-4" />
                <span className="ml-2">Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <IconPlus className="size-4" />
                <span className="ml-2">Add Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconLogout className="size-4" />
                <span className="ml-2">Logout</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="px-3 py-2 text-xs text-muted-foreground">v.1.5.69 · Terms &amp; Conditions</div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
