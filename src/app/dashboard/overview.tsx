// overview page
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
  CheckSquare, 
  MoreVertical, 
  CheckCircle, 
  Calendar, 
  Trash2, 
  Plus, 
  X,
  User,
  Clock,
  Flag
} from "lucide-react"
import data from "./data.json"
import { Calendar as CalendarComponent, CalendarDayButton as DayButton } from "@/components/ui/calendar"

export default function Overview() {
  const [selected] = React.useState((data as any[])[0])

  const messages = React.useMemo(() => {
    if (!selected) return []
    return [
      {
        id: 1,
        author: selected.reviewer || "Support",
        avatar: "https://i.pinimg.com/1200x/be/32/a5/be32a59350ddd9f1f0f13494b1c5a794.jpg",
        time: "11:09 AM",
        body: `Hello, this is an update on ${selected.header}. Status: ${selected.status}.`,
      },
      {
        id: 2,
        author: "Customer",
        avatar: "https://i.pinimg.com/736x/3b/de/a5/3bdea5f546bb0eae992501ddbbb71394.jpg",
        time: "11:12 AM",
        body: "Thanks — can you provide the order number?",
      },
      {
        id: 3,
        author: selected.reviewer || "Support",
        avatar: "https://i.pinimg.com/736x/1d/36/03/1d36037951e66042f1b379a84b07a6c3.jpg",
        time: "11:14 AM",
        body: "Sure — follow-up message with details and next steps.",
      },
    ]
  }, [selected])

  // Updated Todo type with priority, assigned user, and creation time
  type Todo = { 
    id: number; 
    text: string; 
    done: boolean; 
    dueDate?: Date; 
    priority?: 'low' | 'medium' | 'high';
    assignedTo?: string;
    createdAt: Date;
  }

  const [todos, setTodos] = React.useState<Todo[]>([
    { 
      id: 1, 
      text: 'Review order cancellation request', 
      done: false, 
      priority: 'high',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    { 
      id: 2, 
      text: 'Contact customer for order number', 
      done: true, 
      priority: 'medium',
      assignedTo: 'Sarah',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    { 
      id: 3, 
      text: 'Check inventory and refund policy', 
      done: false, 
      priority: 'low',
      assignedTo: 'Mike',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
  ])

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const [newTodo, setNewTodo] = React.useState('')
  const [newTodoDate, setNewTodoDate] = React.useState('')
  const [newTodoTime, setNewTodoTime] = React.useState('')
  const [newTodoPriority, setNewTodoPriority] = React.useState<'low' | 'medium' | 'high'>('medium')
  const [newTodoAssignee, setNewTodoAssignee] = React.useState('You')
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [showDateInputControls, setShowDateInputControls] = React.useState(false)

  // Available team members for assignment
  const teamMembers = ['You', 'Sarah', 'Mike', 'Alex', 'Jessica']

  // Convert string date to Date object for Calendar component
  const selectedDate = newTodoDate ? new Date(newTodoDate) : undefined;

  // Updated addTodo to include priority and assigned user
  const addTodo = (text: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', assignedTo?: string) => {
    const id = Date.now()
    setTodos((prev) => [...prev, { 
      id, 
      text, 
      done: false, 
      dueDate, 
      priority: priority || 'medium',
      assignedTo: assignedTo || 'You',
      createdAt: new Date()
    }])
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter(t => t.id !== id))
  }

  // Handler for when a date is selected from the calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewTodoDate(date.toISOString().split('T')[0]);
      setShowCalendar(false);
    } else {
      setNewTodoDate('');
      setShowCalendar(false);
    }
  };

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (!newTodo.trim()) return;

    let due: Date | undefined = undefined;
    if (newTodoDate) {
      const time = newTodoTime || '00:00';
      due = new Date(`${newTodoDate}T${time}`);
    }
    addTodo(newTodo.trim(), due, newTodoPriority, newTodoAssignee);
    setNewTodo('');
    setNewTodoDate('');
    setNewTodoTime('');
    setNewTodoPriority('medium');
    setNewTodoAssignee('You');
    setShowCalendar(false);
    setShowDateInputControls(false);
  };

  // Format relative time for created at
  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // small helper to format relative due dates without an external lib
  const formatRelative = (d?: Date) => {
    if (!d) return ''
    const diff = d.getTime() - Date.now()
    const days = Math.round(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
    return `${Math.abs(days)} day${Math.abs(days) > 1 ? 's' : ''} ago`
  }

  // Get user avatar based on name
  const getUserAvatar = (name: string) => {
    const avatars = {
      'You': "https://i.pinimg.com/736x/1d/36/03/1d36037951e66042f1b379a84b07a6c3.jpg",
      'Sarah': "https://i.pinimg.com/736x/3b/de/a5/3bdea5f546bb0eae992501ddbbb71394.jpg",
      'Mike': "https://i.pinimg.com/1200x/be/32/a5/be32a59350ddd9f1f0f13494b1c5a794.jpg",
      'Alex': "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399de93b6f3a5c8ed337.jpg",
      'Jessica': "https://i.pinimg.com/736x/54/72/a6/5472a6c3dee122f2c3c7ef8feee83955.jpg"
    }
    return avatars[name as keyof typeof avatars] || ''
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">

      <aside className="col-span-12 lg:col-span-4">
        <div className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-xl">To-Do List</h3>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
            
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs  mt-1">Add a task to get started</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todos.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-start gap-3 rounded-lg border p-3 transition-all hover:bg-accent/50 group ${
                      t.done ? 'bg-muted/30 border-muted' : 'border-border'
                    } ${t.priority === 'high' && !t.done ? 'border-l-4 border-l-destructive' : ''}`}
                  >
                    <Checkbox
                      checked={t.done}
                      onCheckedChange={() => toggleTodo(t.id)}
                      className="mt-0.5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />

                    <div className="flex-1 min-w-0 space-y-2">
                      <p className={`text-sm leading-relaxed ${t.done ? 'text-muted-foreground line-through' : ''}`}>
                        {t.text}
                      </p>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Priority Badge */}
                        {t.priority && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs flex items-center gap-1 ${
                              t.priority === 'high' ? 'border-destructive/20 text-destructive bg-destructive/5' :
                              t.priority === 'medium' ? 'border-amber-500/20 text-amber-600 bg-amber-500/5' :
                              'border-blue-500/20 text-blue-600 bg-blue-500/5'
                            }`}>
                            <Flag className="h-3 w-3" />
                            {t.priority}
                          </Badge>
                        )}

                        {/* Due Date */}
                        {t.dueDate && (
                          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                            t.dueDate < new Date() && !t.done ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Calendar className="h-3 w-3" />
                            <span>
                              {t.dueDate.toLocaleDateString() === new Date().toLocaleDateString()
                                ? 'Today'
                                : formatRelative(t.dueDate)}
                            </span>
                          </div>
                        )}

                        {/* Assigned User */}
                        {t.assignedTo && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{t.assignedTo}</span>
                          </div>
                        )}

                        {/* Created Time */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(t.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* User Avatar */}
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      <AvatarImage src={getUserAvatar(t.assignedTo || 'You')} alt={t.assignedTo} />
                      <AvatarFallback className="text-xs">
                        {String(t.assignedTo).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteTodo(t.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20 px-3 py-3 flex-col items-stretch gap-3">
            {/* Task Input Field */}
            <Input
              placeholder="Add a new task..."
              className="flex-1 text-sm p-2"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
                setShowDateInputControls(e.target.value.trim().length > 0);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newTodo.trim()) {
                  handleAddTask();
                }
              }}
            />

            {/* Advanced Options - Conditionally shown */}
            {showDateInputControls && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Priority Select */}
                  <Select value={newTodoPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTodoPriority(value)}>
                    <SelectTrigger className="w-28 text-xs h-8">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Assignee Select */}
                  <Select value={newTodoAssignee} onValueChange={setNewTodoAssignee}>
                    <SelectTrigger className="w-28 text-xs h-8">
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Date Input Button - Toggles Calendar */}
                  <Button
                    variant="outline"
                    className="w-32 text-xs h-8 justify-start flex-shrink-0"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    {newTodoDate ? new Date(newTodoDate).toLocaleDateString() : 'Due date'}
                  </Button>

                  {/* Add Button */}
                  <Button
                    size="sm"
                    className="h-8"
                    onClick={handleAddTask}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar and Time Input */}
                {showCalendar && (
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                    <div className="relative flex-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 z-10 h-6 w-6 p-0"
                        onClick={() => setShowCalendar(false)}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        components={{ DayButton }}
                      />
                    </div>
                    
                    {newTodoDate && (
                      <Input
                        type="time"
                        placeholder="Due time"
                        className="w-28 text-xs"
                        value={newTodoTime}
                        onChange={(e) => setNewTodoTime(e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </div>
      </aside>

      <main className="col-span-12 lg:col-span-8">
  {/* Header Section */}
  <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">


    {/* Right Actions */}
    <div className="flex items-center gap-2">
      <Select defaultValue="whatsapp">
        <SelectTrigger className="w-[120px]">
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
  </div>

  {/* Tabs Outside Chat Box */}
  <Tabs defaultValue="conversation" className="w-full">
    <TabsList className="mb-4">
      <TabsTrigger value="conversation">Conversation</TabsTrigger>
      <TabsTrigger value="task">Task</TabsTrigger>
      <TabsTrigger value="activity">Activity Logs</TabsTrigger>
      <TabsTrigger value="notes">Notes</TabsTrigger>
    </TabsList>

    {/* Conversation Box */}
    <TabsContent value="conversation">
      <Card className="h-full border rounded-2xl overflow-hidden">
        <CardContent className="p-0 flex flex-col h-[72vh] max-h-[80vh]">
          {/* Messages Area */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-muted/30">
            {messages.map((m) => {
              const isCustomer = m.author === "Customer";
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${
                    isCustomer ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isCustomer && (
                    <Avatar>
                      <AvatarImage src={m.avatar} alt={m.author} />
                      <AvatarFallback>
                        {String(m.author).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[70%] flex flex-col ${
                      isCustomer ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-md px-3 py-2 text-sm ${
                          isCustomer
                            ? "bg-emerald-100 text-foreground dark:text-black"
                            : "bg-border text-foreground"
                        }`}
                      >
                        {m.body}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.time}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        WhatsApp
                      </span>
                    </div>
                  </div>

                  {isCustomer && (
                    <Avatar>
                      <AvatarImage src={m.avatar} alt={m.author} />
                      <AvatarFallback>
                        {String(m.author).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reply Box Inside Chat */}
          <div className="border-t p-3 flex items-center gap-3 bg-background">
<Button
  variant="ghost"
  size="icon"
  className="group relative text-gray-500 hover:text-amber-500 hover:bg-amber-50/60 "
  aria-label="Insert emoji"
  title="Insert emoji"
>
  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
    <span className="absolute text-xl">
      😊
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" className="stroke-current" />
      <path d="M8 14c1.5 1 2.5 1.5 4 1.5s2.5-.5 4-1.5" className="stroke-current" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
    </svg>
  </div>
</Button>


            <Input
              placeholder="Write a reply..."
              className="flex-1"
            />

            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Other Tabs */}
    <TabsContent value="task">
      <div className="text-sm text-muted-foreground">No task items yet.</div>
    </TabsContent>

    <TabsContent value="activity">
      <div className="text-sm text-muted-foreground">Activity log is empty.</div>
    </TabsContent>

    <TabsContent value="notes">
      <div className="text-sm text-muted-foreground">No notes yet.</div>
    </TabsContent>
  </Tabs>
</main>

    </div>
  )
}