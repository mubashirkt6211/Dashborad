import * as React from "react"
import { Home, Calendar as CalendarIcon, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"

// Dummy event data
const events = [
  { id: 1, date: "2025-01-05", title: "Content planning", color: "text-sky-600 bg-sky-100" },
  { id: 2, date: "2025-01-05", title: "Team Lunch", color: "text-pink-600 bg-pink-100" },
  { id: 3, date: "2025-01-10", title: "Product meeting", color: "text-green-600 bg-green-100" },
  { id: 4, date: "2025-01-12", title: "Design sync", color: "text-purple-600 bg-purple-100" },
  { id: 5, date: "2025-01-13", title: "Client Review", color: "text-orange-600 bg-orange-100" },
  { id: 6, date: "2025-01-17", title: "Marketing call", color: "text-blue-600 bg-blue-100" },
  { id: 7, date: "2025-01-23", title: "Team Workshop", color: "text-teal-600 bg-teal-100" },
  { id: 8, date: "2025-01-28", title: "UX Testing", color: "text-amber-600 bg-amber-100" },
]

export default function CalendarDashboard() {
  const daysInMonth = new Date(2025, 1, 0).getDate()
  const firstDay = new Date(2025, 0, 1).getDay() // starting weekday
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Group events by day
  const getEventsForDay = (day: number) => {
    const dateString = `2025-01-${String(day).padStart(2, "0")}`
    return events.filter((e) => e.date === dateString)
  }

  return (
    <div className="flex min-h-screen">
    
      <main className="flex-1 p-6">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Calendar</h2>
          </div>

          {/* Search + Add Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-[220px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
            <Button className="bg-green-600 text-white hover:bg-green-600 flex items-center gap-2 shadow-md">
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="rounded-xl border bg-muted/40 p-1">
            <TabsTrigger value="all">All events</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Calendar Card */}
        <Card className="rounded-2xl border shadow-sm p-6">
          {/* Month Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">January 2025</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">Month view</Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-sm border-t border-l">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="border-b border-r p-2 font-medium text-gray-500 text-center">
                {d}
              </div>
            ))}

            {/* Empty slots before the 1st */}
            {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
              <div key={`empty-${i}`} className="border-b border-r h-24" />
            ))}

            {/* Days */}
            {daysArray.map((day) => {
              const dayEvents = getEventsForDay(day)
              return (
                <div key={day} className="border-b border-r p-2 min-h-[100px] hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <div className="text-xs font-semibold mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 rounded-md text-[11px] font-medium truncate ${event.color}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </main>
    </div>
  )
}
