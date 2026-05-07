import React from "react";
import { TrendingDown, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { motion } from "motion/react";

interface SummaryCardProps {
  totalBalance: number;
  monthlyBudget: number;
}

export default function SummaryCard({ totalBalance, monthlyBudget }: SummaryCardProps) {
  const percentage = (totalBalance / monthlyBudget) * 100;
  
  return (
    <div id="summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-white"
        id="balance-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            Total Spend
          </span>
        </div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">Monthly Expenses</h3>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          ₹{totalBalance.toLocaleString()}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card bg-white"
        id="budget-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <TrendingDown className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            Remaining
          </span>
        </div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">Budget Left</h3>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          ₹{(monthlyBudget - totalBalance).toLocaleString()}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card bg-white"
        id="efficiency-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            Budget Usage
          </span>
        </div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">Current Progress</h3>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold tracking-tight text-slate-900">{percentage.toFixed(1)}%</p>
          <div className="flex-1 h-2 bg-slate-100 rounded-full mb-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${percentage > 90 ? 'bg-rose-500' : 'bg-purple-500'}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
