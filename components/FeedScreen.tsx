"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  id: string;
  name: string | null;
  profile_picture: string | null;
}

interface Post {
  id: string;
  user_id: string;
  content: string | null;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: {
    name: string | null;
    profile_picture: string | null;
  };
}

type Screen = "chat" | "feed" | "profile" | "settings" | "admin" | "aarya-profile";

interface Props {
  profile: Profile;
  onNavigate: (screen: Screen) => void;
}

export default function FeedScreen({ profile }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const supabase = createClient();

  useEffect(() => {
    loadPosts();
    loadLikedPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select(`
        *,
        profiles (name, profile_picture)
      `)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  const loadLikedPosts = async () => {
    const { data } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", profile.id);

    if (data) {
      setLikedPosts(new Set(data.map((l) => l.post_id)));
    }
  };

  const createPost = async () => {
    if (!newPostContent.trim()) return;
    setPosting(true);

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: profile.id,
        content: newPostContent,
      })
      .select(`*, profiles (name, profile_picture)`)
      .single();

    if (!error && data) {
      setPosts([data as Post, ...posts]);
      setNewPostContent("");
    }
    setPosting(false);
  };

  const toggleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);

    if (isLiked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", profile.id);

      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes_count: Math.max(0, p.likes_count - 1) } : p
        )
      );
    } else {
      await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: profile.id,
      });

      setLikedPosts((prev) => new Set([...prev, postId]));

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
        )
      );
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold gradient-text">Feed</h1>
      </header>

      {/* Create Post */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
            {profile.profile_picture ? (
              <Image
                src={profile.profile_picture}
                alt={profile.name || "User"}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Kya chal raha hai?"
              className="w-full bg-transparent border-none resize-none outline-none text-foreground placeholder:text-muted-foreground min-h-[60px]"
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={createPost}
                disabled={!newPostContent.trim() || posting}
                className="px-4 py-2 rounded-full gradient-bg text-white font-medium disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Koi posts nahi hai. Pehla post tum karo!
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {post.profiles?.profile_picture ? (
                    <Image
                      src={post.profiles.profile_picture}
                      alt={post.profiles.name || "User"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {post.profiles?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.profiles?.name || "User"}</span>
                    <span className="text-muted-foreground text-sm">{formatDate(post.created_at)}</span>
                  </div>
                  <p className="mt-2 text-foreground whitespace-pre-wrap">{post.content}</p>
                  {post.image_url && (
                    <div className="mt-3 rounded-xl overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt="Post image"
                        width={500}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-6 mt-3">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 ${likedPosts.has(post.id) ? "text-secondary" : "text-muted-foreground"} hover:text-secondary transition-colors`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comments_count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
