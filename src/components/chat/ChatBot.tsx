import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  keywords: string[];
  answer: string;
}

const faqs: FAQ[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer: "Hello! 👋 Welcome to our support chat. How can I help you today?"
  },
  {
    keywords: ["services", "what do you do", "offer", "provide"],
    answer: "We offer a range of services including web development, mobile app development, UI/UX design, and digital marketing solutions. Would you like to know more about any specific service?"
  },
  {
    keywords: ["pricing", "cost", "price", "how much", "rates", "fee"],
    answer: "Our pricing varies based on project requirements. For a detailed quote, please visit our Contact page or reach out to our team directly. We offer competitive rates and flexible payment options."
  },
  {
    keywords: ["contact", "reach", "email", "phone", "call"],
    answer: "You can reach us through our Contact page, or email us directly. Our team typically responds within 24 hours during business days."
  },
  {
    keywords: ["hours", "open", "available", "working hours", "business hours"],
    answer: "Our business hours are Monday to Friday, 9 AM to 6 PM. However, you can leave us a message anytime and we'll get back to you as soon as possible."
  },
  {
    keywords: ["location", "where", "address", "office", "based"],
    answer: "We operate remotely with team members across multiple locations. This allows us to serve clients globally and provide flexible support."
  },
  {
    keywords: ["team", "employees", "staff", "who works"],
    answer: "Our team consists of experienced developers, designers, and project managers dedicated to delivering high-quality solutions. Visit our Team page to learn more about us!"
  },
  {
    keywords: ["career", "job", "hiring", "work with you", "join"],
    answer: "We're always looking for talented individuals! Check out our Careers page for current openings and how to apply."
  },
  {
    keywords: ["project", "timeline", "how long", "duration", "time"],
    answer: "Project timelines depend on scope and complexity. A simple website might take 2-4 weeks, while larger applications can take several months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    keywords: ["support", "help", "issue", "problem", "bug"],
    answer: "For technical support, please describe your issue in detail. If you're an existing client, you can also reach out through your dedicated support channel."
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    answer: "You're welcome! 😊 Is there anything else I can help you with?"
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    answer: "Goodbye! Feel free to come back if you have more questions. Have a great day! 👋"
  }
];

const defaultResponse = "I'm not sure I understand that question. Here are some things I can help with:\n\n• Our services\n• Pricing information\n• Contact details\n• Business hours\n• Career opportunities\n\nOr you can visit our Contact page for personalized assistance.";

function findFAQAnswer(input: string): string | null {
  const lowercaseInput = input.toLowerCase();
  
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return faq.answer;
    }
  }
  
  return null;
}

async function getAIResponse(message: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('AI response failed');
    }

    const data = await response.json();
    return data.response || defaultResponse;
  } catch (error) {
    console.error('AI chat error:', error);
    return null as unknown as string;
  }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm your virtual assistant. Ask me anything about our services, pricing, or how to get in touch!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    // First check FAQ, then fallback to AI
    const faqAnswer = findFAQAnswer(userInput);
    
    if (faqAnswer) {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: faqAnswer,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 300);
    } else {
      // Try AI response
      const aiResponse = await getAIResponse(userInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse || defaultResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-background border rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Support Assistant</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  {message.isBot && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                      message.isBot
                        ? "bg-muted text-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                  <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} size="icon" disabled={!input.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
