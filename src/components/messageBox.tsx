import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Markdown from "./markdown";

type Props = {
  role: string;
  content: string;
  status?: string; 
};

const MessageBox = ({ role, content, status }: Props) => {
  const isBot = role !== "user"; // AI messages will have an avatar

  return (
    <div className={`flex ${isBot ? "flex-row" : "flex-row-reverse"} gap-3`}>
      {isBot ? (
        <span className="text-xl">🤖</span>
      ) : (
        <span className="text-xl">💬</span>
      )}

      <Card aria-live="polite" className="w-fit max-w-[80%] ">
        <CardContent className="p-6 text-sm">
          {/* Show "Analyzing..." message when status is "streaming" */}
          {status === "streaming" ? (
            <p className="text-muted-foreground">Analyzing...</p>
          ) : (
            <Markdown content={content} />
          )}
        </CardContent>

        {isBot && (
          <CardFooter className="border-t bg-muted/50 py-3 text-muted-foreground">
            <p className="text-sm">
              Disclaimer: The medical information provided by this application
              is for informational purposes only and is not intended to replace
              professional medical diagnosis, treatment, or advice. Always
              consult a qualified healthcare provider for any concerns regarding
              your health.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default MessageBox;
