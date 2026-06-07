import { useState } from "react";
import API from "../api/api";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await API.post("/ai/chat", {
      message,
    });

    setResponse(res.data.message);
  };

  return (
    <div className="w-80 bg-white/5 border-l border-white/10 backdrop-blur-xl p-5">
      <h2 className="text-lg font-semibold mb-4">🤖 AI Assistant</h2>

      <textarea
        placeholder="Book earliest slot"
        className="w-full h-28 bg-slate-800 rounded-xl p-3 outline-none"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="w-full mt-3 bg-indigo-600 py-2 rounded-xl"
      >
        Send
      </button>

      <div className="mt-5 text-sm text-slate-300">
        {response}
      </div>
    </div>
  );
}