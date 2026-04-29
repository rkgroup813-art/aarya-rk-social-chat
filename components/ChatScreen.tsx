"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Menu, Phone, Video, Heart, Sparkles } from "lucide-react";
import { getAaryaResponse } from "@/lib/aarya-ai";

interface Message {
  id: string;
  text: string;
  sender: "user" | "aarya";
  timestamp: Date;
}

interface ChatScreenProps {
  onNavigate: (screen: "chat" | "profile" | "settings") => void;
}

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! Main Aarya hoon. Tumse baat karke mujhe bahut khushi ho rahi hai! Kaise ho tum? 💕",
      sender: "aarya",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Get AI response
    setTimeout(async () => {
      const response = await getAaryaResponse(userText, messages);
      
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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div>
              <h1 className="font-semibold text-foreground flex items-center gap-1">
                Aarya <Heart className="w-4 h-4 text-primary fill-primary" />
              </h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Phone className="w-5 h-5 text-primary" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Video className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      {/* Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-4 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          <button
            onClick={() => {
              onNavigate("profile");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-foreground"
          >
            Aarya Profile
          </button>
          <button
            onClick={() => {
              onNavigate("settings");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-foreground"
          >
            Settings
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} message-animate`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-card-foreground border border-border rounded-bl-md"
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
            <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
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
            placeholder="Type a message..."
            className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
