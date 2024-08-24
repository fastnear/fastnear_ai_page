import React, { useEffect, useState } from "react";
import "./EditBar.scss";
import { useAI } from "../../hooks/ai.jsx";
import { usePageContent } from "../../hooks/pageContent.jsx";

const MaxRows = 10;
const DefaultSystemPrompt =
  "You are a helpful assistant that generates and modifies web content based on prompts. Always return a complete, self-contained HTML document with all necessary styles and scripts included or linked to public CDNs. Wrap your HTML response in a Markdown code block with the language specified as html. Don't comment the HTML code. Don't provide extra explanations.";

// const MatchInnerHtmlRegex = /```html\n([\s\S]*?)\n```/;
const MatchInnerHtmlRegex = /<html([\s\S]*?)<\/html>/;

export function EditBar(props) {
  const [text, setText] = useState("");
  const [numRows, setNumRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [content, setContent] = usePageContent();
  const AI = useAI();

  const executePrompt = async (content, prompt) => {
    // Submitting a prompt to the AI
    const res = await AI.chatCompletion([
      {
        role: "system",
        content: DefaultSystemPrompt,
      },
      {
        role: "user",
        content: `Current HTML:
\`\`\`html
${content}
\`\`\`

New Prompt:
${prompt}

Modify the above HTML based on the new prompt.`,
      },
    ]);
    console.log("response", res);
    content = res?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content returned");
    }
    console.log("content", content);
    const match = content.match(MatchInnerHtmlRegex);
    if (!match) {
      throw new Error("No HTML content found");
    }
    console.log("match", match);
    return `<!DOCTYPE html><html${match[1]}</html>`;
  };

  const submit = () => {
    console.log("submit", text);
    setLoading(true);
    executePrompt(content, text)
      .then((content) => {
        setText("");
        setNumRows(1);
        setContent(content);
        props.onClose();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally((e) => {
        setLoading(false);
      });
  };

  const updateText = (e) => {
    if (loading) {
      return;
    }
    setText(e.target.value);
    setNumRows(Math.min(MaxRows, e.target.value.split("\n").length));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
      return false;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  const nowOpen = props.isOpen;
  useEffect(() => {
    if (textRef && nowOpen) {
      textRef.focus();
    }
  }, [nowOpen, textRef]);

  return (
    <div className={`root-edit-bar ${props.isOpen ? "" : "visually-hidden"}`}>
      <textarea
        ref={setTextRef}
        className="form-control form-control-lg edit-aria"
        disabled={loading}
        rows={numRows}
        value={text}
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyUp}
        onChange={updateText}
        placeholder="What would you like to change?"
        autoFocus
      />
      <button
        className="btn btn-outline-secondary button submit-button"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "*" : "->"}
      </button>
      <button
        className="btn btn-outline-secondary button close-button"
        onClick={props.onClose}
      >
        X
      </button>
    </div>
  );
}
