"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Send, Search, MoreVertical, Phone, Video } from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  name: string
  profile_picture: string | null
  is_online: boolean
  last_seen: string
}

interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id: string
  created_at: string
  is_read: boolean
}

interface MessagesScreenProps {
  currentUserId: string
  onBack: () => void
}

export default function MessagesScreen({ currentUserId, onBack }: MessagesScreenProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    loadUsers()
    
    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentUserId}`
        },
        (payload) => {
          const newMsg = payload.new as Message
          if (selectedUser && newMsg.sender_id === selectedUser.id) {
            setMessages((prev) => [...prev, newMsg])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentUserId, selectedUser])

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser.id)
    }
  }, [selectedUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, name, profile_picture, is_online, last_seen")
      .neq("id", currentUserId)
      .order("is_online", { ascending: false })
      .order("last_seen", { ascending: false })
    
    if (data) setUsers(data)
    setLoading(false)
  }

  const loadMessages = async (userId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentUserId})`)
      .is("is_aarya_message", false)
      .order("created_at", { ascending: true })
    
    if (data) setMessages(data)

    // Mark messages as read
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("sender_id", userId)
      .eq("receiver_id", currentUserId)
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return

    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: currentUserId,
        receiver_id: selectedUser.id,
        content: newMessage.trim(),
        is_aarya_message: false
      })
      .select()
      .single()

    if (!error && data) {
      setMessages((prev) => [...prev, data])
      setNewMessage("")
    }
  }

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  }

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return "Just now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString("en-IN")
  }

  if (selectedUser) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <Image
              src={selectedUser.profile_picture || "/default-avatar.png"}
              alt={selectedUser.name || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            {selectedUser.is_online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{selectedUser.name || "User"}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedUser.is_online ? "Online" : `Last seen ${formatLastSeen(selectedUser.last_seen)}`}
            </p>
          </div>
          <button className="p-2 hover:bg-muted rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.sender_id === currentUserId
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.sender_id === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {formatTime(msg.created_at)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-muted rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-primary text-primary-foreground rounded-full disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-muted rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="w-full p-4 flex items-center gap-3 hover:bg-muted transition-colors border-b border-border"
            >
              <div className="relative">
                <Image
                  src={user.profile_picture || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{user.name || "User"}</h3>
                <p className="text-sm text-muted-foreground">
                  {user.is_online ? "Online" : `Last seen ${formatLastSeen(user.last_seen)}`}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
