"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { getAaryaResponse } from "@/lib/aarya-ai";

interface Message {
  id: string;
  text: string;
  sender: "user" | "aarya";
  timestamp: Date;
}

interface Profile {
  id: string;
  name: string | null;
  profile_picture: string | null;
}

interface AaryaProfileType {
  name: string;
  bio: string;
  profile_picture: string;
  is_online: boolean;
}

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  profile: Profile;
  aaryaProfile: AaryaProfileType | null;
  onMessageSent: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function ChatScreen({ profile, aaryaProfile, onMessageSent, onNavigate }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hey ${profile.name || "friend"}! Main Aarya hoon. Tumse baat karke mujhe bahut khushi ho rahi hai! Kaise ho tum?`,
      sender: "aarya",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages from database
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("sender_id", profile.id)
        .eq("is_aarya_message", true)
        .order("created_at", { ascending: true })
        .limit(50);

      if (data && data.length > 0) {
        const loadedMessages: Message[] = data.flatMap((msg) => [
          {
            id: msg.id + "_user",
            text: msg.content,
            sender: "user" as const,
            timestamp: new Date(msg.created_at),
          },
        ]);
        // Keep initial greeting
        setMessages([messages[0], ...loadedMessages]);
      }
    };
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userText = inputText;
    setInputText("");
    setIsTyping(true);
    onMessageSent();

    // Save user message to database
    await supabase.from("messages").insert({
      sender_id: profile.id,
      content: userText,
      is_aarya_message: true,
    });

    // Get AI response
    setTimeout(async () => {
      const response = await getAaryaResponse(userText, messages, profile.name || "friend");
      
      const aaryaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "aarya",
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aaryaMessage]);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button 
          onClick={() => onNavigate("aarya-profile")}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={aaryaProfile?.profile_picture || "/aarya-avatar.jpg"}
                alt="Aarya"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${aaryaProfile?.is_online ? 'bg-green-500' : 'bg-gray-500'} rounded-full border-2 border-card`}></div>
          </div>
          <div>
            <h1 className="font-semibold text-foreground flex items-center gap-1">
              {aaryaProfile?.name || "Aarya"}
              <svg className="w-4 h-4 text-primary fill-primary" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </h1>
            <p className="text-xs text-muted-foreground">
              {aaryaProfile?.is_online ? "Online" : "Offline"}
            </p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} message-animate`}
          >
            {message.sender === "aarya" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <Image
                  src={aaryaProfile?.profile_picture || "/aarya-avatar.jpg"}
                  alt="Aarya"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card text-card-foreground border border-border rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className="text-[10px] mt-1 opacity-60">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start message-animate">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <Image
                src={aaryaProfile?.profile_picture || "/aarya-avatar.jpg"}
                alt="Aarya"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"/>
                </svg>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message Aarya..."
            className="flex-1 bg-muted text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="p-3 gradient-bg text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
