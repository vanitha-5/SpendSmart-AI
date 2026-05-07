import React, { useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getSavingTips } from "../services/aiService";
import { Expense } from "../constants";

interface AIAssistantProps {
  expenses: Expense[];
}

export default function AIAssistant({ expenses }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tips, setTips] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchTips = async () => {
    setLoading(true);
    const result = await getSavingTips(expenses);
    setTips(result || null);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="ai-assistant-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          if (!tips) handleFetchTips();
        }}
        className="fixed bottom-8 right-8 bg-[#2563EB] text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2 group overflow-hidden"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden font-medium">
          Ask Assistant
        </span>
      </motion.button>

      {/* Assistant Modal/Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 w-80 md:w-96 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-50 overflow-hidden flex flex-col max-h-[500px]"
            id="ai-panel"
          >
            <div className="p-4 bg-[#2563EB] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">SpendSmart Advisor</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-sm text-slate-500 font-medium animate-pulse">Analyzing your spending patterns...</p>
                </div>
              ) : (
                <div className="prose prose-sm prose-slate">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Financial Insights</h4>
                  <div className="text-slate-700 leading-relaxed space-y-4">
                    {tips?.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('*') || line.startsWith('-') ? 'pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full' : ''}>
                        {line.replace(/^[*-\s]+/, '')}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <button 
                onClick={handleFetchTips}
                className="w-full btn-primary text-sm !rounded-2xl flex items-center justify-center gap-2"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
                Refresh Tips
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
