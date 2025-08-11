import { useState } from 'react';
import { Search, Download, ChevronDown, Calendar, X } from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const RewardsHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Client Order ID');
    const [dateRange, setDateRange] = useState('2025-08-05 → 2025-08-11');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date('2025-08-05'));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date('2025-08-11'));
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));

    // Mock data for rewards history
    const rewardsHistory = [
        {
            id: 'RW001',
            clientOrderId: 'ORD123456',
            customerName: 'John Doe',
            customerPhone: '+91 98765 43210',
            customerEmail: 'john.doe@email.com',
            rewardType: 'Cashback',
            rewardAmount: 150.00,
            rewardPercentage: 5,
            orderValue: 3000.00,
            orderDate: '2025-08-10',
            rewardDate: '2025-08-11',
            status: 'Credited',
            platform: 'Fastrr',
            source: 'First Order'
        },
        {
            id: 'RW002',
            clientOrderId: 'ORD123457',
            customerName: 'Jane Smith',
            customerPhone: '+91 98765 43211',
            customerEmail: 'jane.smith@email.com',
            rewardType: 'Points',
            rewardAmount: 200,
            rewardPercentage: 10,
            orderValue: 2000.00,
            orderDate: '2025-08-09',
            rewardDate: '2025-08-10',
            status: 'Pending',
            platform: 'Fastrr',
            source: 'Referral Bonus'
        },
        {
            id: 'RW003',
            clientOrderId: 'ORD123458',
            customerName: 'Mike Johnson',
            customerPhone: '+91 98765 43212',
            customerEmail: 'mike.johnson@email.com',
            rewardType: 'Cashback',
            rewardAmount: 75.00,
            rewardPercentage: 3,
            orderValue: 2500.00,
            orderDate: '2025-08-08',
            rewardDate: '2025-08-09',
            status: 'Credited',
            platform: 'Fastrr',
            source: 'Festival Offer'
        },
        {
            id: 'RW004',
            clientOrderId: 'ORD123459',
            customerName: 'Sarah Wilson',
            customerPhone: '+91 98765 43213',
            customerEmail: 'sarah.wilson@email.com',
            rewardType: 'Points',
            rewardAmount: 150,
            rewardPercentage: 7.5,
            orderValue: 2000.00,
            orderDate: '2025-08-07',
            rewardDate: '2025-08-08',
            status: 'Failed',
            platform: 'Fastrr',
            source: 'Loyalty Program'
        },
        {
            id: 'RW005',
            clientOrderId: 'ORD123460',
            customerName: 'David Brown',
            customerPhone: '+91 98765 43214',
            customerEmail: 'david.brown@email.com',
            rewardType: 'Cashback',
            rewardAmount: 300.00,
            rewardPercentage: 6,
            orderValue: 5000.00,
            orderDate: '2025-08-06',
            rewardDate: '2025-08-07',
            status: 'Credited',
            platform: 'Fastrr',
            source: 'Premium Customer'
        }
    ];

    const filteredRewards = rewardsHistory.filter(reward => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        switch (searchCriteria) {
            case 'Client Order ID':
                return reward.clientOrderId.toLowerCase().includes(lowerCaseSearchTerm);
            case 'Customer Name':
                return reward.customerName.toLowerCase().includes(lowerCaseSearchTerm);
            case 'Customer Phone':
                return reward.customerPhone.toLowerCase().includes(lowerCaseSearchTerm);
            case 'Customer Email':
                return reward.customerEmail.toLowerCase().includes(lowerCaseSearchTerm);
            case 'Reward Type':
                return reward.rewardType.toLowerCase().includes(lowerCaseSearchTerm);
            default:
                return (
                    reward.clientOrderId.toLowerCase().includes(lowerCaseSearchTerm) ||
                    reward.customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
                    reward.customerPhone.toLowerCase().includes(lowerCaseSearchTerm) ||
                    reward.customerEmail.toLowerCase().includes(lowerCaseSearchTerm) ||
                    reward.rewardType.toLowerCase().includes(lowerCaseSearchTerm)
                );
        }
    });

    const handleDownload = () => {
        const headers = [
            'Reward ID',
            'Client Order ID',
            'Customer Name',
            'Customer Phone',
            'Customer Email',
            'Reward Type',
            'Reward Amount',
            'Reward Percentage',
            'Order Value',
            'Order Date',
            'Reward Date',
            'Status',
            'Platform',
            'Source'
        ];

        const csvContent = [
            headers.join(','),
            ...filteredRewards.map(reward => [
                reward.id,
                reward.clientOrderId,
                reward.customerName,
                reward.customerPhone,
                reward.customerEmail,
                reward.rewardType,
                reward.rewardAmount,
                reward.rewardPercentage,
                reward.orderValue,
                reward.orderDate,
                reward.rewardDate,
                reward.status,
                reward.platform,
                reward.source
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rewards_history.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const isDateInRange = (date) => {
        return date >= selectedStartDate && date <= selectedEndDate;
    };

    const isDateSelected = (date) => {
        return date.toDateString() === selectedStartDate.toDateString() ||
            date.toDateString() === selectedEndDate.toDateString();
    };

    const handleDateSelect = (date) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        } else {
            if (date < selectedStartDate) {
                setSelectedEndDate(selectedStartDate);
                setSelectedStartDate(date);
            } else {
                setSelectedEndDate(date);
            }
        }
    };

    const handleQuickSelect = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        setSelectedStartDate(start);
        setSelectedEndDate(end);
        setDateRange(`${formatDate(start)} → ${formatDate(end)}`);
        setShowDatePicker(false);
    };

    const applyDateRange = () => {
        if (selectedStartDate && selectedEndDate) {
            setDateRange(`${formatDate(selectedStartDate)} → ${formatDate(selectedEndDate)}`);
            setShowDatePicker(false);
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const startingDay = firstDayOfMonth.getDay();

        const days = [];
        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isInRange = isDateInRange(date);
            const isSelected = isDateSelected(date);

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(date)}
                    className={`w-8 h-8 rounded-full text-sm transition-colors ${isSelected
                        ? 'bg-[#F58220] text-white'
                        : isInRange
                            ? 'bg-[#F58220] bg-opacity-20 text-[#F58220]'
                            : 'hover:bg-gray-100'
                        }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Credited':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRewardTypeColor = (type) => {
        switch (type) {
            case 'Cashback':
                return 'bg-blue-100 text-blue-800';
            case 'Points':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header and Date Picker */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Rewards History</h1>
                    <p className="text-gray-600 mt-1">Track and manage customer rewards and loyalty programs</p>
                </div>

                {/* Date Range Picker */}
                <div className="relative">
                    <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{dateRange}</span>
                        <ChevronDown size={16} className="text-gray-500" />
                    </button>

                    {showDatePicker && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[280px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Select Date Range</h3>
                                <button
                                    onClick={() => setShowDatePicker(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Quick Select Buttons */}
                            <div className="flex space-x-2 mb-4">
                                <button
                                    onClick={() => handleQuickSelect(7)}
                                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Last 7 days
                                </button>
                                <button
                                    onClick={() => handleQuickSelect(30)}
                                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Last 30 days
                                </button>
                                <button
                                    onClick={() => handleQuickSelect(90)}
                                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Last 90 days
                                </button>
                            </div>

                            {/* Calendar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        ←
                                    </button>
                                    <span className="font-medium">
                                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        →
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="w-8 h-8 flex items-center justify-center">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendar()}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={applyDateRange}
                                    disabled={!selectedStartDate || !selectedEndDate}
                                    className="flex-1 px-4 py-2 bg-[#F58220] text-white rounded-lg hover:bg-[#d6731a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedStartDate(new Date('2025-08-05'));
                                        setSelectedEndDate(new Date('2025-08-11'));
                                        setDateRange('2025-08-05 → 2025-08-11');
                                        setShowDatePicker(false);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search and Download */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Search Criteria Dropdown */}
                        <div className="relative">
                            <select
                                value={searchCriteria}
                                onChange={(e) => setSearchCriteria(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] bg-white cursor-pointer w-full sm:w-48"
                            >
                                <option value="Client Order ID">Client Order ID</option>
                                <option value="Customer Name">Customer Name</option>
                                <option value="Customer Phone">Customer Phone</option>
                                <option value="Customer Email">Customer Email</option>
                                <option value="Reward Type">Reward Type</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder={`Search by ${searchCriteria.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] w-full sm:w-80"
                            />
                        </div>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                    >
                        <Download size={16} />
                        <span>Download All</span>
                    </button>
                </div>
            </Card>

            {/* Rewards History Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={[
                        'Reward ID',
                        'Client Order ID',
                        'Customer Name',
                        'Customer Phone',
                        'Customer Email',
                        'Reward Type',
                        'Reward Amount',
                        'Reward %',
                        'Order Value',
                        'Order Date',
                        'Reward Date',
                        'Status',
                        'Platform',
                        'Source'
                    ]}>
                        {filteredRewards.length > 0 ? (
                            filteredRewards.map((reward) => (
                                <TableRow key={reward.id}>
                                    <TableCell className="font-medium text-gray-900">
                                        {reward.id}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.clientOrderId}
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {reward.customerName}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.customerPhone}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.customerEmail}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRewardTypeColor(reward.rewardType)}`}>
                                            {reward.rewardType}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.rewardType === 'Cashback' ? `₹${reward.rewardAmount.toFixed(2)}` : reward.rewardAmount}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.rewardPercentage}%
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        ₹{reward.orderValue.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.orderDate}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.rewardDate}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reward.status)}`}>
                                            {reward.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.platform}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {reward.source}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="14" className="text-center py-12">
                                    <div className="flex flex-col items-center">
                                        <Search size={48} className="text-gray-300 mb-4" />
                                        <p className="text-lg font-medium text-gray-900 mb-2">No rewards found</p>
                                        <p className="text-gray-500">Try adjusting your search criteria or date range</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default RewardsHistory;
