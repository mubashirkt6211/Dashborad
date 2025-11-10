// app/overview.tsx
import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Calendar,
  Trash2,
  Plus,
  X,
  User,
  Clock,
  Flag,
  Smile,
} from "lucide-react"
import { Calendar as CalendarComponent, CalendarDayButton as DayButton } from "@/components/ui/calendar"
import data from "./data.json"

export default function Overview() {
  const [selected] = React.useState((data as any[])[0])

  const messages = React.useMemo(() => {
    if (!selected) return []
    return [
      {
        id: 1,
        author: selected.reviewer || "Support",
        avatar:
          "https://i.pinimg.com/1200x/be/32/a5/be32a59350ddd9f1f0f13494b1c5a794.jpg",
        time: "11:09 AM",
        body: `Hi! Here's an update on ${selected.header}. Status: ${selected.status}.`,
      },
      {
        id: 2,
        author: "Customer",
        avatar:
          "https://i.pinimg.com/736x/3b/de/a5/3bdea5f546bb0eae992501ddbbb71394.jpg",
        time: "11:12 AM",
        body: "Thanks — can you provide the order number?",
      },
      {
        id: 3,
        author: selected.reviewer || "Support",
        avatar:
          "https://i.pinimg.com/736x/1d/36/03/1d36037951e66042f1b379a84b07a6c3.jpg",
        time: "11:14 AM",
        body: "Sure — here are the details and next steps.",
      },
    ]
  }, [selected])

  type Todo = {
    id: number
    text: string
    done: boolean
    dueDate?: Date
    priority?: "low" | "medium" | "high"
    assignedTo?: string
    createdAt: Date
  }

  const [todos, setTodos] = React.useState<Todo[]>([
    {
      id: 1,
      text: "Review order cancellation request",
      done: false,
      priority: "high",
      assignedTo: "You",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      text: "Contact customer for order number",
      done: true,
      priority: "medium",
      assignedTo: "Sarah",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      text: "Check inventory and refund policy",
      done: false,
      priority: "low",
      assignedTo: "Mike",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
  ])

  const [newTodo, setNewTodo] = React.useState("")
  const [newTodoDate, setNewTodoDate] = React.useState("")
  const [newTodoTime, setNewTodoTime] = React.useState("")
  const [newTodoPriority, setNewTodoPriority] =
    React.useState<"low" | "medium" | "high">("medium")
  const [newTodoAssignee, setNewTodoAssignee] = React.useState("You")
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [showDateInputControls, setShowDateInputControls] =
    React.useState(false)
  const teamMembers = ["You", "Sarah", "Mike", "Alex", "Jessica"]
  const selectedDate = newTodoDate ? new Date(newTodoDate) : undefined

  const addTodo = (
    text: string,
    dueDate?: Date,
    priority?: "low" | "medium" | "high",
    assignedTo?: string
  ) => {
    const id = Date.now()
    setTodos((prev) => [
      ...prev,
      {
        id,
        text,
        done: false,
        dueDate,
        priority: priority || "medium",
        assignedTo: assignedTo || "You",
        createdAt: new Date(),
      },
    ])
  }

  const deleteTodo = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id))

  const toggleTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewTodoDate(date.toISOString().split("T")[0])
      setShowCalendar(false)
    } else {
      setNewTodoDate("")
      setShowCalendar(false)
    }
  }

  const handleAddTask = () => {
    if (!newTodo.trim()) return
    let due: Date | undefined
    if (newTodoDate) {
      const time = newTodoTime || "00:00"
      due = new Date(`${newTodoDate}T${time}`)
    }
    addTodo(newTodo.trim(), due, newTodoPriority, newTodoAssignee)
    setNewTodo("")
    setNewTodoDate("")
    setNewTodoTime("")
    setNewTodoPriority("medium")
    setNewTodoAssignee("You")
    setShowCalendar(false)
    setShowDateInputControls(false)
  }

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const formatRelative = (d?: Date) => {
    if (!d) return ""
    const diff = d.getTime() - Date.now()
    const days = Math.round(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days > 0) return `in ${days} day${days > 1 ? "s" : ""}`
    return `${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""} ago`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-all">
      {/* Left Sidebar - ToDo */}
      <aside className="col-span-12 lg:col-span-4 space-y-4">
        <Card className="shadow-sm border rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">To-Do List</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
            {todos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No tasks yet — add one below.
              </p>
            ) : (
              todos.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border hover:shadow-sm flex items-start gap-3 transition-all duration-200 ${
                    t.done
                      ? "opacity-70 bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <Checkbox
                    checked={t.done}
                    onCheckedChange={() => toggleTodo(t.id)}
                    className="mt-1 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        t.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {t.text}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap mt-2 text-xs text-muted-foreground">
                      {t.priority && (
                        <Badge
                          variant="outline"
                          className={`px-2 ${
                            t.priority === "high"
                              ? "border-red-300 text-red-600 bg-red-50"
                              : t.priority === "medium"
                              ? "border-amber-300 text-amber-600 bg-amber-50"
                              : "border-blue-300 text-blue-600 bg-blue-50"
                          }`}
                        >
                          <Flag className="h-3 w-3 mr-1" /> {t.priority}
                        </Badge>
                      )}
                      {t.dueDate && (
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full dark:bg-gray-800">
                          <Calendar className="h-3 w-3" />
                          {formatRelative(t.dueDate)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3" /> {t.assignedTo}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatTimeAgo(t.createdAt)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(t.id)}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>

          <CardFooter className="flex-col gap-3 border-t bg-gray-50 dark:bg-gray-800/50">
            <Input
              placeholder="Add a new task..."
              className="text-sm"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value)
                setShowDateInputControls(e.target.value.trim().length > 0)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />

            {showDateInputControls && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <Select
                    value={newTodoPriority}
                    onValueChange={(v: "low" | "medium" | "high") =>
                      setNewTodoPriority(v)
                    }
                  >
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={newTodoAssignee}
                    onValueChange={setNewTodoAssignee}
                  >
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue placeholder="Assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    {newTodoDate
                      ? new Date(newTodoDate).toLocaleDateString()
                      : "Due date"}
                  </Button>

                  <Button
                    size="sm"
                    className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleAddTask}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {showCalendar && (
                  <div className="flex gap-3 items-center border rounded-lg p-3 bg-background">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                      components={{ DayButton }}
                    />
                    {newTodoDate && (
                      <Input
                        type="time"
                        value={newTodoTime}
                        onChange={(e) => setNewTodoTime(e.target.value)}
                        className="w-28 text-xs"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowCalendar(false)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      </aside>

      {/* Right - Chat + Tabs */}
      <main className="col-span-12 lg:col-span-8 space-y-4">
        <div className="flex justify-between items-center">
          <Select defaultValue="whatsapp">
            <SelectTrigger className="w-[130px]">
              <SelectValue>WhatsApp</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
            Submit as Closed
          </Button>
        </div>

        <Tabs defaultValue="conversation" className="w-full">
          <TabsList className="mb-3 bg-muted/30 rounded-xl p-1">
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="conversation">
            <Card className="border rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
              <CardContent className="flex flex-col h-[72vh]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-md">
                  {messages.map((m) => {
                    const isCustomer = m.author === "Customer"
                    return (
                      <div
                        key={m.id}
                        className={`flex gap-3 ${
                          isCustomer ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isCustomer && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={m.avatar} alt={m.author} />
                            <AvatarFallback>
                              {m.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[70%] flex flex-col ${
                            isCustomer ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                              isCustomer
                                ? "bg-emerald-100 text-gray-900"
                                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                            }`}
                          >
                            {m.body}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {m.time}
                          </div>
                        </div>

                        {isCustomer && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={m.avatar} alt={m.author} />
                            <AvatarFallback>
                              {m.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="border-t p-3 flex items-center gap-3 bg-background">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-amber-500 hover:bg-amber-50/60"
                    title="Insert emoji"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Input placeholder="Write a reply..." className="flex-1" />
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="task">
            <div className="text-sm text-muted-foreground">No tasks yet.</div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="text-sm text-muted-foreground">No activity yet.</div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="text-sm text-muted-foreground">No notes yet.</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
