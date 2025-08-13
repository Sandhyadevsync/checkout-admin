import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    DollarSign,
    Users,
    Package,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    BarChart3,
    PieChart,
    Activity,
    Filter,
    ChevronUp,
    ChevronDown,
    Star
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { dashboardStats, recentOrders, trafficAcquisitionData, paymentModeData, discountsAnalyticsData, userFeedbackData } from '../data/mockData';
import { useState } from 'react';
import React from 'react'; // Added missing import for React

const StatCard = ({ title, value, change, changeType = 'up', icon: Icon, color = 'blue', subtitle }) => {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        purple: 'text-purple-600 bg-purple-50',
        orange: 'text-orange-600 bg-orange-50',
        red: 'text-red-600 bg-red-50'
    };

    const changeIcon = changeType === 'up' ? ArrowUpRight : ArrowDownRight;
    const changeColor = changeType === 'up' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    )}
                    {change && (
                        <div className="flex items-center mt-2">
                            {React.createElement(changeIcon, { className: changeColor, size: 16 })}
                            <span className={`text-sm font-medium ${changeColor} ml-1`}>
                                {changeType === 'up' ? '+' : ''}{change}%
                            </span>
                            <span className="text-xs text-gray-500 ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};

const ChartCard = ({ title, subtitle, children, action }) => (
    <Card title={title} subtitle={subtitle} action={action}>
        {children}
    </Card>
);

const SimpleLineChart = ({ data, height = 'h-32' }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));
    const range = maxValue - minValue;

    // Extract numeric height value from Tailwind class
    const heightValue = parseInt(height.replace('h-', '')) || 32;
    const width = data.length * 40;

    return (
        <div className={`${height} relative`}>
            <svg className="w-full h-full" viewBox={`0 0 ${width} ${heightValue}`}>
                <path
                    d={data.map((item, index) => {
                        const x = index * 40;
                        const y = range === 0 ? heightValue / 2 : heightValue - ((item.value - minValue) / range) * (heightValue * 0.8);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    stroke="#F58220"
                    strokeWidth="2"
                    fill="none"
                    className="transition-all duration-500"
                />
                {data.map((item, index) => {
                    const x = index * 40;
                    const y = range === 0 ? heightValue / 2 : heightValue - ((item.value - minValue) / range) * (heightValue * 0.8);
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="#F58220"
                            className="transition-all duration-500"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Orders',
            value: dashboardStats.totalOrders.toLocaleString(),
            change: dashboardStats.monthlyGrowth,
            changeType: 'up',
            icon: ShoppingCart,
            color: 'blue',
            subtitle: 'Last 30 days'
        },
        {
            title: 'Total Revenue',
            value: `₹${dashboardStats.totalRevenue.toLocaleString()}`,
            change: dashboardStats.monthlyGrowth,
            changeType: 'up',
            icon: DollarSign,
            color: 'green',
            subtitle: 'Last 30 days'
        },
        {
            title: 'Active Customers',
            value: dashboardStats.totalCustomers.toLocaleString(),
            change: 8.2,
            changeType: 'up',
            icon: Users,
            color: 'purple',
            subtitle: 'Last 30 days'
        },
        {
            title: 'Conversion Rate',
            value: `${dashboardStats.conversionRate}%`,
            change: 2.1,
            changeType: 'up',
            icon: Eye,
            color: 'orange',
            subtitle: 'Last 30 days'
        }
    ];

    // Session Conversion Data
    const sessionConversionData = [
        {
            dateRange: '06-Aug - 06-Aug',
            checkoutInitiated: 0,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '07-Aug - 07-Aug',
            checkoutInitiated: 0,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '08-Aug - 08-Aug',
            checkoutInitiated: 0,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '09-Aug - 09-Aug',
            checkoutInitiated: 0,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '10-Aug - 10-Aug',
            checkoutInitiated: 0,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '11-Aug - 11-Aug',
            checkoutInitiated: 6,
            loggedIn: 6,
            addressAdded: 6,
            paymentInitiated: 2,
            ordersPlaced: 0,
            conversion: '-'
        },
        {
            dateRange: '12-Aug - 12-Aug',
            checkoutInitiated: 1,
            loggedIn: 0,
            addressAdded: 0,
            paymentInitiated: 0,
            ordersPlaced: 0,
            conversion: '-'
        }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Delivered': 'bg-green-100 text-green-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-gray-100 text-gray-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'Delivered': CheckCircle,
            'Processing': Clock,
            'Shipped': Package,
            'Pending': AlertCircle,
            'Cancelled': AlertCircle
        };
        return icons[status] || AlertCircle;
    };

    const calculateConversionPercentage = (current, total) => {
        if (total === 0) return '0%';
        return `${((current / total) * 100).toFixed(2)}%`;
    };

    const exportToCSV = () => {
        // Create CSV content
        const headers = ['Steps', 'Checkout Initiated', 'Logged In', 'Address Added', 'Payment Initiated', 'Orders Placed', 'Conversion'];
        const csvContent = [
            headers.join(','),
            ...sessionConversionData.map(row => [
                row.dateRange,
                row.checkoutInitiated,
                row.loggedIn > 0 ? `${row.loggedIn} (${calculateConversionPercentage(row.loggedIn, row.checkoutInitiated)})` : row.loggedIn,
                row.addressAdded > 0 ? `${row.addressAdded} (${calculateConversionPercentage(row.addressAdded, row.checkoutInitiated)})` : row.addressAdded,
                row.paymentInitiated > 0 ? `${row.paymentInitiated} (${calculateConversionPercentage(row.paymentInitiated, row.checkoutInitiated)})` : row.paymentInitiated,
                row.ordersPlaced,
                row.conversion
            ].join(','))
        ].join('\n');

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'session-conversion-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportTrafficAcquisition = () => {
        const headers = ['Source/Medium/Campaign', 'Checkouts', 'Orders', 'Revenue', 'Conversion'];
        const csvContent = [
            headers.join(','),
            ...trafficAcquisitionData.map(row => [
                row.source,
                row.checkouts,
                row.orders,
                row.revenue,
                row.conversion
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'traffic-acquisition-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPaymentMode = () => {
        const headers = ['Payment Mode', 'Checkouts', 'Orders', 'GMV', 'Percentage Completion'];
        const csvContent = [
            headers.join(','),
            ...paymentModeData.map(row => [
                row.mode,
                row.checkouts,
                row.orders,
                row.gmv,
                row.percentageCompletion
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'payment-mode-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportDiscountsAnalytics = () => {
        const headers = ['Discount Code', 'Type', 'Total Orders', 'Conversion%', 'Total GMV', 'Total Discount Amount', 'Total Attempts', 'Total Applied', 'Error Rate'];
        const csvContent = [
            headers.join(','),
            ...discountsAnalyticsData.map(row => [
                row.code,
                row.type,
                row.totalOrders,
                row.conversion,
                row.totalGMV,
                row.totalDiscountAmount,
                row.totalAttempts,
                row.totalApplied,
                row.errorRate
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'discounts-analytics-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportUserFeedback = () => {
        const headers = ['Customer Name', 'Email', 'Rating', 'Feedback', 'Category', 'Status', 'Date'];
        const csvContent = [
            headers.join(','),
            ...userFeedbackData.map(row => [
                row.customerName,
                row.email,
                row.rating,
                row.feedback,
                row.category,
                row.status,
                row.date
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'user-feedback-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [expandedUPI, setExpandedUPI] = useState(false);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                </div>
                <div className="flex items-center space-x-3">
                    {/* Calendar */}
                    <div className="relative">
                        <button className="btn-secondary flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>2025-08-06 → 2025-08-12</span>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/*Session Conversion */}
            <Card >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#F58220] text-white px-3 py-1 rounded-full text-sm font-medium">
                            SESSION CONVERSION
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                        <button className="btn-secondary flex items-center space-x-2" onClick={exportToCSV}>
                            <TrendingUp size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Steps</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Checkout Initiated</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Logged In</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Address Added</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Payment Initiated</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Orders Placed</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Conversion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessionConversionData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                        {row.dateRange}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.checkoutInitiated}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.loggedIn > 0 ? (
                                            <span>
                                                {row.loggedIn} ({calculateConversionPercentage(row.loggedIn, row.checkoutInitiated)})
                                            </span>
                                        ) : (
                                            row.loggedIn
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.addressAdded > 0 ? (
                                            <span>
                                                {row.addressAdded} ({calculateConversionPercentage(row.addressAdded, row.checkoutInitiated)})
                                            </span>
                                        ) : (
                                            row.addressAdded
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.paymentInitiated > 0 ? (
                                            <span>
                                                {row.paymentInitiated} ({calculateConversionPercentage(row.paymentInitiated, row.checkoutInitiated)})
                                            </span>
                                        ) : (
                                            row.paymentInitiated
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.ordersPlaced}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {row.conversion === '-' ? (
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                {row.conversion}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-700">{row.conversion}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing 1 to 7 of 7 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                            <ArrowUpRight size={16} className="rotate-180" />
                        </button>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight size={16} />
                        </button>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>7 / page</option>
                            <option>10 / page</option>
                            <option>25 / page</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Traffic Acquisition Table */}
            <Card >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#F58220] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Traffic Acquisition
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="btn-secondary flex items-center space-x-2" onClick={exportTrafficAcquisition}>
                            <TrendingUp size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700 flex items-center">
                                    Source/Medium/Campaign
                                    <Filter size={14} className="ml-2 text-gray-400" />
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Checkouts</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Orders</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Revenue</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Conversion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trafficAcquisitionData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                        {row.source}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.checkouts}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.orders}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        ₹{row.revenue.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {row.conversion === '-' ? (
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                {row.conversion}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-700">{row.conversion}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing 1 to 7 of 7 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                            <ArrowUpRight size={16} className="rotate-180" />
                        </button>
                        <span className="px-3 py-1 bg-[#F58220] text-white rounded text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight size={16} />
                        </button>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>7 / page</option>
                            <option>10 / page</option>
                            <option>25 / page</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Payment Mode Comparison Table */}
            <Card >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#F58220] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Payment Mode Comparison
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="btn-secondary flex items-center space-x-2" onClick={exportPaymentMode}>
                            <TrendingUp size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Payment initiated with mode</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Checkouts</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Orders</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">GMV</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Percentage Completion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentModeData.map((row, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                            {row.subModes ? (
                                                <button
                                                    className="flex items-center space-x-2 focus:outline-none"
                                                    onClick={() => setExpandedUPI(!expandedUPI)}
                                                >
                                                    {expandedUPI ? (
                                                        <ChevronUp size={16} className="text-[#F58220]" />
                                                    ) : (
                                                        <ChevronDown size={16} className="text-[#F58220]" />
                                                    )}
                                                    <span>{row.mode}</span>
                                                </button>
                                            ) : (
                                                row.mode
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700">
                                            {row.checkouts}
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700">
                                            {row.orders}
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700">
                                            ₹{row.gmv.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {row.percentageCompletion === '-' ? (
                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    {row.percentageCompletion}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-700">{row.percentageCompletion}</span>
                                            )}
                                        </td>
                                    </tr>
                                    {row.subModes && expandedUPI && (
                                        row.subModes.map((subRow, subIndex) => (
                                            <tr key={`${index}-${subIndex}`} className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-gray-700 pl-12">
                                                    {subRow.mode}
                                                </td>
                                                <td className="py-3 px-4 text-center text-sm text-gray-700">
                                                    {subRow.checkouts}
                                                </td>
                                                <td className="py-3 px-4 text-center text-sm text-gray-700">
                                                    {subRow.orders}
                                                </td>
                                                <td className="py-3 px-4 text-center text-sm text-gray-700">
                                                    ₹{subRow.gmv.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {subRow.percentageCompletion === '-' ? (
                                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                            {subRow.percentageCompletion}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-700">{subRow.percentageCompletion}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing 1 to 4 of 4 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                            <ArrowUpRight size={16} className="rotate-180" />
                        </button>
                        <span className="px-3 py-1 bg-[#F58220] text-white rounded text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight size={16} />
                        </button>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>10 / page</option>
                            <option>25 / page</option>
                            <option>50 / page</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Discounts Analytics Table */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#F58220] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Discounts Analytics
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="btn-secondary flex items-center space-x-2" onClick={exportDiscountsAnalytics}>
                            <TrendingUp size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Discount Code</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Type</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Total Orders</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Conversion%</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Total GMV</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Total Discount Amount</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Total Attempts</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Total Applied</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Error Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discountsAnalyticsData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-[#F58220] rounded-full"></div>
                                            <span>{row.code}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.type}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.totalOrders}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                            {row.conversion}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        ₹{row.totalGMV.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        ₹{row.totalDiscountAmount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.totalAttempts}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.totalApplied}
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {row.errorRate}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing 1 to 5 of 5 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                            <ArrowUpRight size={16} className="rotate-180" />
                        </button>
                        <span className="px-3 py-1 bg-[#F58220] text-white rounded text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight size={16} />
                        </button>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>5 / page</option>
                            <option>10 / page</option>
                            <option>25 / page</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* User Feedback Section */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#F58220] text-white px-3 py-1 rounded-full text-sm font-medium">
                            User Feedback
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="btn-secondary flex items-center space-x-2" onClick={exportUserFeedback}>
                            <TrendingUp size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Feedback Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Rating</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Feedback</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Category</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userFeedbackData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{row.customerName}</div>
                                            <div className="text-xs text-gray-500">{row.email}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`${i < row.rating ? 'text-[#F58220] fill-current' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-700 max-w-xs">
                                        <div className="truncate" title={row.feedback}>
                                            {row.feedback}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {row.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${row.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                            row.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm text-gray-700">
                                        {new Date(row.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing 1 to 3 of 3 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                            <ArrowUpRight size={16} className="rotate-180" />
                        </button>
                        <span className="px-3 py-1 bg-[#F58220] text-white rounded text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight size={16} />
                        </button>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>3 / page</option>
                            <option>5 / page</option>
                            <option>10 / page</option>
                        </select>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard; 