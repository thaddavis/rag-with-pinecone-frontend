"use client";

import { ChatContext } from "@/app/agents/react/ChatSessionContext";
import { ChatList } from "@/components/react-chat/chat-list";
import { ChatPanel } from "@/components/react-chat/chat-panel";
import { EmptyScreen } from "@/components/react-chat/empty-screen";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn("pb-[200px] pt-4 md:pt-10", className)}
        ref={messagesRef}
      >
        {chatState.messages.length ? (
          <ChatList
            messages={chatState.messages}
            isCompletionLoading={chatState.completionLoading}
            currentTool={chatState.currentTool}
          />
        ) : (
          <EmptyScreen />
        )}
      </div>
      <ChatPanel
        sessionId={chatState.sessionId}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
