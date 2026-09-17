import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { answerQuestion, quickQuestions, SUPPORT } from "@/data/faq";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  /** Rendered when the bot could not match a rule. */
  escalate?: boolean;
  followUps?: string[];
};

const INTRO: Msg = {
  id: 0,
  from: "bot",
  text:
    "Vanakkam! I'm the Y.G helper — a basic FAQ bot built only for quick clarity, not a real agent. Ask about products, delivery, offers, cancellations or refunds.",
  followUps: quickQuestions,
};

/** Rule-based FAQ assistant. No network, no model — keyword matching only. */
export function FaqBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const reply = answerQuestion(question);
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, from: "user", text: question },
      {
        id: nextId.current++,
        from: "bot",
        text: reply.text,
        escalate: !reply.matched,
        followUps: reply.followUps,
      },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close the FAQ helper" : "Open the FAQ helper"}
        className="floating-faq-btn fixed z-50 flex h-11 w-11 sm:h-12 sm:w-auto items-center justify-center sm:gap-2 rounded-full bg-[#FFC700] hover:bg-[#F0B800] p-0 sm:px-4 text-xs sm:text-sm font-bold text-[#181206] border border-[#D8A700] shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        {open ? <X className="h-5 w-5 text-[#181206]" /> : <MessageSquare className="h-5 w-5 text-[#181206]" />}
        <span className="hidden sm:inline">{open ? "Close" : "FAQ Helper"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Y.G FAQ helper"
          style={{
            bottom: "calc(4.75rem + var(--fab-offset, 0px))",
          }}
          className="fixed inset-x-3 sm:inset-x-auto sm:right-6 sm:w-96 z-50 flex max-h-[72vh] sm:max-h-[70vh] flex-col overflow-hidden rounded-2xl sm:rounded-[8px] border-2 border-[#FFC700] sm:border-[#E8DEC8] bg-white shadow-2xl"
        >
          <header className="bg-[#FFC700] text-[#181206] font-black px-4 py-3 flex items-center justify-between border-b border-[#D8A700]">
            <div>
              <p className="font-bold text-sm tracking-wide">Y.G FAQ Helper</p>
              <p className="text-[11px] text-[#181206]/80">
                Rule-based answers for instant clarity
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-[#181206]/80 hover:text-[#181206] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 bg-[#FAF3D6]">
            {messages.map((m) => (
              <div key={m.id}>
                {m.from === "user" ? (
                  <p className="ml-auto w-fit max-w-[85%] rounded-[6px] bg-[#FFC700] px-3.5 py-2 text-xs text-[#181206] font-bold shadow-xs border border-[#D8A700]">
                    {m.text}
                  </p>
                ) : (
                  <div className="max-w-[92%] text-xs leading-relaxed text-[#181206] bg-white p-3 rounded-[6px] border border-[#E8DEC8] shadow-xs">
                    <p>{m.text}</p>
                    {m.escalate && (
                      <div className="mt-3 rounded-[4px] border border-[#FFC700]/20 bg-[#FAF3D6] p-2.5 text-[11px]">
                        <p className="font-bold text-[#181206]">
                          Please contact our support team:
                        </p>
                        <ul className="mt-1.5 space-y-1 text-[#6E777D]">
                          <li className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-[#181206]" />
                            <a className="font-medium text-[#181206] hover:underline" href={SUPPORT.phoneHref}>
                              {SUPPORT.phone}
                            </a>
                            <span>· {SUPPORT.hours}</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <MessageSquare className="h-3 w-3 text-[#181206]" />
                            <a
                              className="font-medium text-[#181206] hover:underline"
                              href={SUPPORT.whatsappHref}
                              target="_blank"
                              rel="noreferrer"
                            >
                              WhatsApp {SUPPORT.whatsapp}
                            </a>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-[#181206]" />
                            <a className="font-medium text-[#181206] hover:underline" href={SUPPORT.emailHref}>
                              {SUPPORT.email}
                            </a>
                          </li>
                        </ul>
                        <Button
                          asChild
                          size="sm"
                          className="mt-2.5 w-full h-8 text-[11px] rounded-[4px] bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black font-bold"
                          onClick={() => setOpen(false)}
                        >
                          <Link to="/contact">Open Support Page</Link>
                        </Button>
                      </div>
                    )}
                    {m.followUps && m.followUps.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.followUps.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => ask(f)}
                            className="rounded-[4px] border border-[#E8DEC8] bg-[#FAF3D6] px-2 py-1 text-[10px] font-medium text-[#181206] transition-colors hover:border-[#FFC700] hover:text-[#181206] cursor-pointer"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-[#E8DEC8] p-2.5 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              aria-label="Ask the FAQ helper a question"
              className="min-h-9 flex-1 rounded-[6px] border border-[#E8DEC8] bg-white px-3 text-xs text-[#181206] outline-none focus-visible:border-[#FFC700]"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-[6px] bg-[#FFC700] hover:bg-[#E6B000] text-[#181206] font-black cursor-pointer"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
