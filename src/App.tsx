import React, { useState, useMemo } from "react";
import { Plus, Wallet, LayoutDashboard, Receipt, Settings, LogOut, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_EXPENSES, Expense } from "./constants";
import SummaryCard from "./components/SummaryCard";
import ExpenseTable from "./components/ExpenseTable";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", category: "General" });
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalBalance = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const monthlyBudget = 50000;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ description: "", amount: "", category: "General" });
    setIsAddModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop Only for now */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E2E8F0] flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-[#2563EB] p-2 rounded-xl">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">SpendSmart</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarLink 
            icon={<Receipt className="w-5 h-5" />} 
            label="Transactions" 
            active={activeTab === "transactions"} 
            onClick={() => setActiveTab("transactions")}
          />
          <SidebarLink 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            active={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-6">
          <button className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors w-full px-2 py-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Personal Overview</h2>
            <p className="text-slate-500 mt-1">Monitor your monthly expenses and get AI-powered insights.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center justify-center gap-2"
            id="add-expense-btn"
          >
            <Plus className="w-5 h-5" />
            New Transaction
          </button>
        </header>

        <SummaryCard totalBalance={totalBalance} monthlyBudget={monthlyBudget} />
        
        <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />

        <AIAssistant expenses={expenses} />
      </main>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card !p-8 bg-white"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Record New Expense</h3>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    placeholder="e.g. AWS Hosting" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount (₹)</label>
                    <input 
                      required
                      type="number" 
                      step="1"
                      placeholder="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 appearance-none"
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    >
                      <option>Food</option>
                      <option>Rent</option>
                      <option>Travel</option>
                      <option>Bills</option>
                      <option>Entertainment</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 btn-secondary">Cancel</button>
                  <button type="submit" className="flex-1 btn-primary">Add Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between group px-4 py-3 rounded-xl transition-all ${
        active 
          ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50" 
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {active && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}
