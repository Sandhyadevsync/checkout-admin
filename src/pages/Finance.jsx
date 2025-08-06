import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Download,
    Plus,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { financeData } from '../data/mockData';

const Finance = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    };

    const getTransactionIcon = (type) => {
        return type === 'Credit' ? (
            <ArrowUpRight className="text-orange-500" size={16} />
        ) : (
            <ArrowDownRight className="text-red-600" size={16} />
        );
    };

    const getTransactionColor = (type) => {
        return type === 'Credit' ? 'text-orange-500' : 'text-red-600';
    };

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
                <button className="btn-secondary flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export</span>
                </button>
                <button className="btn-primary flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add Funds</span>
                </button>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Wallet Balance</h3>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>

                    <div className="text-center py-8">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                            {formatCurrency(financeData.currentBalance)}
                        </div>
                        <div className="text-sm text-gray-600">Available Balance</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-500">
                                {formatCurrency(financeData.monthlyRevenue)}
                            </div>
                            <div className="text-sm text-orange-500">Monthly Revenue</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency(financeData.monthlyExpenses)}
                            </div>
                            <div className="text-sm text-red-600">Monthly Expenses</div>
                        </div>
                    </div>
                </Card>

                <Card title="Quick Actions">
                    <div className="space-y-3">
                        <button className="w-full btn-primary">Recharge Wallet</button>
                        <button className="w-full btn-secondary">Request Payout</button>
                        <button className="w-full btn-secondary">View Statements</button>
                        <button className="w-full btn-secondary">Set Auto Recharge</button>
                    </div>
                </Card>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Net Profit</p>
                            <p className="text-2xl font-bold text-orange-500">
                                {formatCurrency(financeData.monthlyRevenue - financeData.monthlyExpenses)}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <TrendingUp className="text-orange-500" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                            <p className="text-2xl font-bold text-orange-600">
                                {formatCurrency(financeData.pendingPayouts)}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <TrendingDown className="text-orange-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                            <p className="text-2xl font-bold text-orange-500">
                                {((financeData.monthlyRevenue - financeData.monthlyExpenses) / financeData.monthlyRevenue * 100).toFixed(1)}%
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <TrendingUp className="text-orange-500" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                            <p className="text-2xl font-bold text-orange-500">
                                {formatCurrency(financeData.monthlyRevenue / financeData.transactions.length)}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <TrendingUp className="text-orange-500" size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card title="Recent Transactions">
                <Table headers={['Transaction ID', 'Type', 'Amount', 'Description', 'Date', 'Status']}>
                    {financeData.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    {getTransactionIcon(transaction.type)}
                                    <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                                        {transaction.type}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className={`font-medium ${getTransactionColor(transaction.type)}`}>
                                {formatCurrency(Math.abs(transaction.amount))}
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    {transaction.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            {/* Financial Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Revenue Trends">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">This Month</span>
                            <span className="text-sm font-medium text-orange-500">+12.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Last Month</span>
                            <span className="text-sm font-medium text-gray-600">+8.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </Card>

                <Card title="Expense Breakdown">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Service Fees</span>
                            <span className="text-sm font-medium">₹45,680</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Processing Fees</span>
                            <span className="text-sm font-medium">₹32,450</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Other Expenses</span>
                            <span className="text-sm font-medium">₹47,300</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Finance; 