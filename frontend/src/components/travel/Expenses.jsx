import React, { useState, useEffect } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Receipt, DollarSign } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const Expenses = () => {
  const { getAuthHeaders } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/trips/expenses`,
        { headers: getAuthHeaders() }
      );
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/expenses" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <Button>Add Expense</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                <div className="flex items-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold">{totalExpenses.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <span className="text-3xl font-bold text-yellow-600">
                  {expenses.filter(e => e.status === 'pending').length}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <span className="text-3xl font-bold text-green-600">
                  {expenses.filter(e => e.status === 'approved').length}
                </span>
              </CardContent>
            </Card>
          </div>

          {loading && <div className="flex justify-center py-12"><div className="loading-spinner"></div></div>}

          {!loading && expenses.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No expenses recorded yet.</p>
              </CardContent>
            </Card>
          )}

          {!loading && expenses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Expense History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{expense.description}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="capitalize">{expense.category}</span>
                          <span>{expense.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="text-lg font-bold">{expense.amount.toFixed(2)}</span>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold expense-status-${expense.status}`}>
                          {expense.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;