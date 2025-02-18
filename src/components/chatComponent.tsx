import React, { useState, useEffect, useRef } from "react";
import { Badge } from "./ui/badge";
import { useChat } from "@ai-sdk/react";
import MessageBox from "./messageBox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";

type Props = {
  reportData: string;
};

const ChatComponent = ({ reportData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "api/medichatgemini",
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitWithLoading = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true); // Set loading state to true
    try {
      handleSubmit(e, { data: { reportData } }); // Pass the reportData
    } finally {
      setLoading(false); // Reset loading state once the submit is done
    }
  };

  return (
    <div className="relative h-full bg-muted/50 flex flex-col min-h-[50vh] p-4 gap-4">
      <Badge
        variant={"outline"}
        className={`absolute right-3 top-3 ${
          reportData ? "bg-[#00B612] " : ""
        }`}
      >
        {reportData ? "Report Added" : "No Report Added"}
      </Badge>

      {/* Chat messages container (flows from bottom to top) */}
      <div className="flex flex-col gap-4 min-h-[75vh] overflow-y-auto mt-5">
        {/* Loading Indicator */}
        {!reportData && (
          <div className="absolute z-10 h-full w-full flex items-center justify-center p-6">
            <span className="text-gray-800 text-xl font-medium text-center">
              Upload your report first to chat with the bot 🤖 and get
              personalized recommendations.
            </span>
          </div>
        )}

        {/* Render the messages */}
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            role={msg.role}
            content={msg.content}
            status={status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Form to submit queries */}
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={handleSubmitWithLoading}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query"
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          disabled={!reportData} // Disable textarea if no report is added
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={!reportData || loading} // Disable button if no report or if it's loading
            className="ml-auto"
            type="submit"
            size="sm"
          >
            {loading ? "Analyzing..." : "Ask"}
            {loading ? (
              <Loader2 className="size-3.5 animate-spin ml-2" />
            ) : (
              <CornerDownLeft className="ml-2" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
