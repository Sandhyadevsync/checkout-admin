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

const Wallet = () => {
    const [activeTab, setActiveTab] = useState('DEDUCTION HISTORY');
    const [dateRange, setDateRange] = useState('2025-08-05 → 2025-08-11');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date('2025-08-05'));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date('2025-08-11'));
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Client Order ID');

    // Mock data for wallet transactions
    const walletTransactions = [
        {
            id: 'WT001',
            transactionId: 'TXN001',
            date: '2025-01-15',
            time: '10:30 AM',
            paymentMode: 'Credit Card',
            transactionSubType: 'Service Fee',
            invoiceValue: '₹1,49,999',
            transactionType: 'Deduction',
            commissionAmount: '₹7,499',
            remarks: 'Processing fee for order ORD001'
        },
        {
            id: 'WT002',
            transactionId: 'TXN002',
            date: '2025-01-14',
            time: '02:15 PM',
            paymentMode: 'UPI',
            transactionSubType: 'Commission',
            invoiceValue: '₹89,999',
            transactionType: 'Deduction',
            commissionAmount: '₹4,499',
            remarks: 'Commission for order ORD002'
        }
    ];

    // Mock data for recharge history
    const rechargeHistory = [
        {
            id: 'RH001',
            rechargeAmount: '₹50,000',
            transactionType: 'Wallet Recharge',
            rechargeDate: '2025-01-15',
            transactionId: 'RCH001',
            rechargeStatus: 'Success',
            remarks: 'Monthly wallet recharge via UPI'
        },
        {
            id: 'RH002',
            rechargeAmount: '₹25,000',
            transactionType: 'Wallet Recharge',
            rechargeDate: '2025-01-10',
            transactionId: 'RCH002',
            rechargeStatus: 'Success',
            remarks: 'Additional funds for bulk orders'
        }
    ];

    const filteredTransactions = walletTransactions.filter(transaction => {
        const matchesSearch =
            transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.invoiceValue.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const filteredRechargeHistory = rechargeHistory.filter(recharge => {
        const matchesSearch =
            recharge.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recharge.rechargeAmount.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleDownload = () => {
        let headers, csvContent;

        if (activeTab === 'DEDUCTION HISTORY') {
            headers = [
                'Transaction ID',
                'Date & Time',
                'Payment Mode',
                'Transaction SubType',
                'Invoice Value',
                'Transaction Type',
                'Commission Amount (Incl. taxes)',
                'Remarks'
            ];

            csvContent = [
                headers.join(','),
                ...filteredTransactions.map(txn => [
                    txn.transactionId,
                    `${txn.date} ${txn.time}`,
                    txn.paymentMode,
                    txn.transactionSubType,
                    txn.invoiceValue,
                    txn.transactionType,
                    txn.commissionAmount,
                    txn.remarks
                ].join(','))
            ].join('\n');
        } else {
            headers = [
                'Recharge Amount',
                'Transaction Type',
                'Recharge Date',
                'Transaction ID',
                'Recharge Status',
                'Remarks'
            ];

            csvContent = [
                headers.join(','),
                ...filteredRechargeHistory.map(recharge => [
                    recharge.rechargeAmount,
                    recharge.transactionType,
                    recharge.rechargeDate,
                    recharge.transactionId,
                    recharge.rechargeStatus,
                    recharge.remarks
                ].join(','))
            ].join('\n');
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${activeTab.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['DEDUCTION HISTORY', 'RECHARGE HISTORY'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Filters and Actions */}
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
                                <option value="Transaction ID">Transaction ID</option>
                                <option value="Invoice Value">Invoice Value</option>
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

                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
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

                        {/* Download Button */}
                        <button
                            onClick={handleDownload}
                            className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                        >
                            <Download size={16} />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Wallet Transactions Table */}
            <Card>
                <div className="overflow-x-auto">
                    {activeTab === 'DEDUCTION HISTORY' ? (
                        <Table headers={[
                            'Transaction ID',
                            'Date & Time',
                            'Payment Mode',
                            'Transaction SubType',
                            'Invoice Value',
                            'Transaction Type',
                            'Commission Amount (Incl. taxes)',
                            'Remarks'
                        ]}>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                        {transaction.transactionId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{transaction.date}</div>
                                        <div className="text-xs text-gray-500">{transaction.time}</div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {transaction.paymentMode}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {transaction.transactionSubType}
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {transaction.invoiceValue}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {transaction.transactionType}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {transaction.commissionAmount}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {transaction.remarks}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    ) : (
                        <Table headers={[
                            'Recharge Amount',
                            'Transaction Type',
                            'Recharge Date',
                            'Transaction ID',
                            'Recharge Status',
                            'Remarks'
                        ]}>
                            {filteredRechargeHistory.map((recharge) => (
                                <TableRow key={recharge.id}>
                                    <TableCell className="font-semibold text-gray-900">
                                        {recharge.rechargeAmount}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {recharge.transactionType}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-900">
                                        {recharge.rechargeDate}
                                    </TableCell>
                                    <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                        {recharge.transactionId}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${recharge.rechargeStatus === 'Success'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {recharge.rechargeStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {recharge.remarks}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    )}

                    {((activeTab === 'DEDUCTION HISTORY' && filteredTransactions.length === 0) ||
                        (activeTab === 'RECHARGE HISTORY' && filteredRechargeHistory.length === 0)) && (
                            <div className="text-center py-12">
                                <div className="text-lg font-medium text-gray-900 mb-2">
                                    {activeTab === 'DEDUCTION HISTORY' ? 'No wallet transactions found' : 'No recharge history found'}
                                </div>
                                <div className="text-gray-500">Try adjusting your search criteria or date range</div>
                            </div>
                        )}
                </div>
            </Card>
        </div>
    );
};

export default Wallet;
