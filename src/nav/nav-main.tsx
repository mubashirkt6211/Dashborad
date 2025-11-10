"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    items?: { title: string; url: string; icon?: Icon }[]
  }[]
}) {
  const [open, setOpen] = React.useState<string | null>(null)

  const toggle = (title: string) => {
    setOpen((prev) => (prev === title ? null : title))
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              onClick={() => {
                try {
                  window.location.hash = "dashboard"
                } catch {
                  /* noop in SSR */
                }
              }}
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggle(item.title)}
                    isActive={open === item.title}
                    aria-expanded={open === item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                  {open === item.title && (
                    <SidebarMenuSub>
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={sub.url}
                              onClick={() => setOpen(null)}
                            >
                              {sub.icon && <sub.icon />}
                              <span>{sub.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuButton tooltip={item.title} asChild>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
