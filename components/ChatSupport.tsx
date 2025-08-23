import { useState } from 'react';
import { Protect } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { MessageCircle, X, Send, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);
  
  const router = useRouter();

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! Our support team will get back to you soon.", 
          isUser: false 
        }]);
      }, 1000);
      setMessage('');
    }
  };

  // Chat toggle button - always visible
  const chatButton = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-50"
    >
      {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
    </button>
  );

  // Chat window
  const chatWindow = isOpen && (
    <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      {/* Show upgrade prompt for users without chat support */}
      <Protect
        condition={(has) => !has({ feature: 'chat_support' })}
        fallback={null}
      >
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <Lock className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chat Support is a Premium Feature</h3>
          <p className="text-muted-foreground mb-6">
            Upgrade to Max plan to access 24/7 chat support
          </p>
          <Button 
            onClick={() => {
              setIsOpen(false);
              router.push('/pricing');
            }}
            className="w-full"
          >
            Upgrade Plan
          </Button>
        </div>
      </Protect>

      {/* Show chat interface for users with chat support */}
      <Protect
        condition={(has) => has({ feature: 'chat_support' })}
        fallback={null}
      >
        <div className="flex flex-col h-full">
          <div className="border-b p-4">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-sm text-muted-foreground">We typically reply in minutes</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Protect>
    </Card>
  );

  return (
    <>
      {chatButton}
      {chatWindow}
    </>
  );
}