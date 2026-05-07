import React from "react";
import { Trash2, Tag, Calendar, MoreVertical } from "lucide-react";
import { Expense } from "../constants";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  return (
    <div className="glass-card overflow-hidden !p-0" id="expenses-container">
      <div className="px-6 py-4 border-bottom border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
        <button className="btn-secondary !py-1 text-xs px-3">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="expense-table">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-100">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                  No transactions found.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{expense.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">₹{expense.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(expense.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
