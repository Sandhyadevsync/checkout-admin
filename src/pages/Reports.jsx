import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Download,
    Calendar,
    BarChart3,
    PieChart,
    Users,
    DollarSign
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { reportsData } from '../data/mockData';

const Reports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    // Simple chart component (in a real app, you'd use a charting library like Chart.js or Recharts)
    const SimpleBarChart = ({ data, title }) => {
        const maxValue = Math.max(...data.map(item => item.sales));

        return (
            <div className="space-y-3">
                <h4 className="font-medium text-gray-900">{title}</h4>
                <div className="space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-16 text-sm text-gray-600">{item.month}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(item.sales / maxValue) * 100}%` }}
                                ></div>
                            </div>
                            <div className="w-20 text-sm font-medium text-gray-900">
                                {formatCurrency(item.sales)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex justify-end space-x-2">
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                </select>
                <button className="btn-secondary flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export Report</span>
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(reportsData.salesChart[reportsData.salesChart.length - 1].sales)}
                            </p>
                            <div className="flex items-center mt-1">
                                <TrendingUp className="text-green-500" size={16} />
                                <span className="text-sm text-green-600 ml-1">+12.5%</span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Customers</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {reportsData.customerStats.totalCustomers.toLocaleString()}
                            </p>
                            <div className="flex items-center mt-1">
                                <TrendingUp className="text-green-500" size={16} />
                                <span className="text-sm text-green-600 ml-1">+8.2%</span>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">New Customers</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {reportsData.customerStats.newCustomers}
                            </p>
                            <div className="flex items-center mt-1">
                                <TrendingUp className="text-green-500" size={16} />
                                <span className="text-sm text-green-600 ml-1">+15.3%</span>
                            </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Users className="text-purple-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Customer Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{reportsData.customerStats.avgCustomerValue}
                            </p>
                            <div className="flex items-center mt-1">
                                <TrendingUp className="text-green-500" size={16} />
                                <span className="text-sm text-green-600 ml-1">+5.7%</span>
                            </div>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <DollarSign className="text-orange-600" size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Sales Trend">
                    <SimpleBarChart data={reportsData.salesChart} title="Monthly Sales" />
                </Card>

                <Card title="Customer Growth">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Customers</span>
                            <span className="text-sm font-medium">{reportsData.customerStats.totalCustomers}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">New Customers</span>
                            <span className="text-sm font-medium">{reportsData.customerStats.newCustomers}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Repeat Customers</span>
                            <span className="text-sm font-medium">{reportsData.customerStats.repeatCustomers}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-purple-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Top Products */}
            <Card title="Top Performing Products">
                <Table headers={['Product', 'Sales', 'Revenue', 'Growth']}>
                    {reportsData.topProducts.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.sales.toLocaleString()} units</TableCell>
                            <TableCell className="font-medium">{formatCurrency(product.revenue)}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <TrendingUp className="text-green-500" size={16} />
                                    <span className="text-sm text-green-600 ml-1">+{Math.floor(Math.random() * 20) + 5}%</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Revenue Insights">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Monthly Growth</span>
                            <span className="text-sm font-medium text-green-600">+12.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Quarterly Growth</span>
                            <span className="text-sm font-medium text-green-600">+18.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Yearly Growth</span>
                            <span className="text-sm font-medium text-green-600">+25.7%</span>
                        </div>
                    </div>
                </Card>

                <Card title="Customer Insights">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Customer Retention</span>
                            <span className="text-sm font-medium text-blue-600">92.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Customer Satisfaction</span>
                            <span className="text-sm font-medium text-green-600">4.6/5</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Support Tickets</span>
                            <span className="text-sm font-medium text-orange-600">45</span>
                        </div>
                    </div>
                </Card>

                <Card title="Quick Actions">
                    <div className="space-y-3">
                        <button className="w-full btn-primary">Generate Custom Report</button>
                        <button className="w-full btn-secondary">Schedule Reports</button>
                        <button className="w-full btn-secondary">Share Analytics</button>
                        <button className="w-full btn-secondary">Set Alerts</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Reports; 