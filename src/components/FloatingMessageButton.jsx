
import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Minimize2, Maximize2, CheckCircle, AlertCircle } from 'lucide-react';

const FloatingMessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('visitor_name');
    const savedEmail = localStorage.getItem('visitor_email');
    const savedPhone = localStorage.getItem('visitor_phone');
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setStatus('error');
      setStatusMessage('Please enter a message');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setIsSending(true);
    setStatus(null);

    
    if (name) localStorage.setItem('visitor_name', name);
    if (email) localStorage.setItem('visitor_email', email);
    if (phone) localStorage.setItem('visitor_phone', phone);

    try {
     
      const response = await fetch('https://api.showapp.ng/api/showa/public/v1/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '+2349037102599', 
          message: message,
          visitor_name: name || 'Anonymous',
          visitor_email: email || '',
          visitor_phone: phone || '',
          page_url: window.location.href
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage('Message sent successfully! We\'ll get back to you soon.');
        setMessage('');
        
        setTimeout(() => {
          setIsOpen(false);
          setIsMinimized(false);
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setStatusMessage(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else if (isOpen) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/*=========== Floating Button =============*/}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={toggleChat}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            style={{ width: '80px', height: '80px' }}
          >
            {isMinimized ? (
              <Maximize2 size={28} />
              
            ) : (
                <div className="text-center space-y-1 mx-auto">
                    
                     <MessageCircle style={{marginLeft:10}} size={28} className="animate-bounce" />
                     <span className="text-white font-medium">Showa</span>
            </div>
             
            )}
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)]">
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-2xl p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <h3 className="font-semibold text-xl">Showa</h3>
                <span className="font-semibold">Send us a message</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="hover:bg-green-700 p-1 rounded transition"
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  onClick={closeChat}
                  className="hover:bg-green-700 p-1 rounded transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 XXX XXX XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                {status === 'success' && (
                  <div className="bg-green-50 text-green-800 p-3 rounded-lg flex items-center space-x-2">
                    <CheckCircle size={18} className="text-green-600" />
                    <span className="text-sm">{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg flex items-center space-x-2">
                    <AlertCircle size={18} className="text-red-600" />
                    <span className="text-sm">{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending || !message.trim()}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-gray-50 rounded-b-2xl p-3 text-center text-xs text-gray-500 border-t">
              We'll respond as soon as possible
            </div>
          </div>
        )}
      </div>

      {isMinimized && isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            style={{ width: '60px', height: '60px' }}
          >
            <MessageCircle size={28} />
            
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingMessageButton;