import { useState } from 'react';
import {
    Download,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    ChevronDown as FilterIcon
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const Finance = () => {
    const [dateRange, setDateRange] = useState('2025-08-05 → 2025-08-11');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date('2025-08-05'));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date('2025-08-11'));
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Client Order ID');

    const handleDateRangeChange = (start, end) => {
        setSelectedStartDate(start);
        setSelectedEndDate(end);
        setDateRange(`${formatDate(start)} → ${formatDate(end)}`);
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const isDateInRange = (date) => {
        const checkDate = new Date(date);
        return checkDate >= selectedStartDate && checkDate <= selectedEndDate;
    };

    const isDateSelected = (date) => {
        const checkDate = new Date(date);
        return formatDate(checkDate) === formatDate(selectedStartDate) ||
            formatDate(checkDate) === formatDate(selectedEndDate);
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

    const handleQuickSelect = (type) => {
        const today = new Date();
        let start, end;

        switch (type) {
            case 'today':
                start = end = new Date(today);
                break;
            case 'yesterday':
                start = end = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                break;
            case 'last7days':
                start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
                end = today;
                break;
            case 'thisMonth':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'last30days':
                start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
                end = today;
                break;
            default:
                return;
        }

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

    const renderCalendar = (monthOffset = 0) => {
        const displayDate = new Date(currentMonth);
        displayDate.setMonth(displayDate.getMonth() + monthOffset);
        const { daysInMonth, startingDay } = getDaysInMonth(displayDate);

        const days = [];
        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
            const inRange = isDateInRange(date);
            const selected = isDateSelected(date);

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(date)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${selected
                        ? 'bg-blue-600 text-white'
                        : inRange
                            ? 'bg-blue-100 text-blue-800'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    // Mock data for transactions
    const transactions = [
        {
            id: 'TXN001',
            date: '2025-01-15',
            time: '10:30 AM',
            prepaidTransactionId: 'PT001',
            customer: 'John Doe',
            paymentMethod: 'Credit Card',
            paymentAmount: '₹1,49,999'
        },
        {
            id: 'TXN002',
            date: '2025-01-14',
            time: '02:15 PM',
            prepaidTransactionId: 'PT002',
            customer: 'Jane Smith',
            paymentMethod: 'UPI',
            paymentAmount: '₹89,999'
        },
        {
            id: 'TXN003',
            date: '2025-01-13',
            time: '11:45 AM',
            prepaidTransactionId: 'PT003',
            customer: 'Mike Johnson',
            paymentMethod: 'Net Banking',
            paymentAmount: '₹79,999'
        }
    ];

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch =
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.prepaidTransactionId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleDownload = () => {
        const headers = [
            'Order ID',
            'Date & Time',
            'Prepaid Transaction ID',
            'Customer',
            'Payment Method',
            'Payment Amount'
        ];

        const csvContent = [
            headers.join(','),
            ...filteredTransactions.map(txn => [
                txn.id,
                `${txn.date} ${txn.time}`,
                txn.prepaidTransactionId,
                txn.customer,
                txn.paymentMethod,
                txn.paymentAmount
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                </div>

                {/* Date Range Picker */}
                <div className="relative">
                    <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{dateRange}</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {/* Date Picker Popup */}
                    {showDatePicker && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[600px]">
                            {/* Calendar Navigation */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="flex space-x-8">
                                    <span className="font-medium text-gray-900">
                                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* Two Month Calendars */}
                            <div className="flex space-x-8 mb-4">
                                {/* First Month */}
                                <div className="flex-1">
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {renderCalendar(0)}
                                    </div>
                                </div>

                                {/* Second Month */}
                                <div className="flex-1">
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {renderCalendar(1)}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Selection Buttons */}
                            <div className="flex space-x-2 mb-4">
                                {['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last 30 Days'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleQuickSelect(type.toLowerCase().replace(/\s+/g, ''))}
                                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {/* Apply Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={applyDateRange}
                                    disabled={!selectedStartDate || !selectedEndDate}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                >
                    <Download size={16} />
                    <span>Download All</span>
                </button>
            </div>

            {/* Payment Amount Card */}
            <Card className="w-64">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">₹0.00</div>
                        <div className="text-sm text-gray-600">Payment Amount</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">₹</span>
                    </div>
                </div>
            </Card>

            {/* Search and Filters */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Search Criteria Dropdown */}
                        <div className="relative">
                            <select
                                value={searchCriteria}
                                onChange={(e) => setSearchCriteria(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] bg-white cursor-pointer w-full sm:w-40"
                            >
                                <option value="Client Order ID">Client Order ID</option>
                                <option value="Prepaid Transaction ID">Prepaid Transaction ID</option>
                                <option value="Customer">Customer</option>
                            </select>
                            <FilterIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] w-full sm:w-80"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Transactions Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={[
                        'Order ID',
                        'Date & Time',
                        'Prepaid Transaction ID',
                        'Customer',
                        'Payment Method',
                        'Payment Amount'
                    ]}>
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                    {transaction.id}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-900">{transaction.date}</div>
                                    <div className="text-xs text-gray-500">{transaction.time}</div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700 font-mono">
                                    {transaction.prepaidTransactionId}
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {transaction.customer}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {transaction.paymentMethod}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-900">
                                    {transaction.paymentAmount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-lg font-medium text-gray-900 mb-2">No transactions found</div>
                            <div className="text-gray-500">Try adjusting your search criteria or date range</div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Finance; 