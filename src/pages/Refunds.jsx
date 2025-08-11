import { useState, useRef } from 'react';
import {
    Download,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    RefreshCw,
    ChevronDown as FilterIcon,
    Upload,
    FileText,
    X
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const Refunds = () => {
    const [activeTab, setActiveTab] = useState('TRANSACTION HISTORY');
    const [dateRange, setDateRange] = useState('2025-08-05 → 2025-08-11');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date('2025-08-05'));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date('2025-08-11'));
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Client Order ID');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    // Mock data for refunds
    const refunds = [
        {
            id: 'REF001',
            clientOrderId: 'ORD001',
            refundTransactionId: 'RFT001',
            refundDate: '2025-01-15',
            refundTime: '10:30 AM',
            refundedAmount: '₹1,49,999',
            refundInitiatedBy: 'Customer',
            paymentStatus: 'Completed',
            paymentGateway: 'Razorpay',
            paymentTransactionId: 'PT001',
            paymentDate: '2025-01-10',
            paymentTime: '09:15 AM',
            paymentTotal: '₹1,49,999'
        },
        {
            id: 'REF002',
            clientOrderId: 'ORD002',
            refundTransactionId: 'RFT002',
            refundDate: '2025-01-14',
            refundTime: '02:15 PM',
            refundedAmount: '₹89,999',
            refundInitiatedBy: 'Admin',
            paymentStatus: 'Pending',
            paymentGateway: 'Stripe',
            paymentTransactionId: 'PT002',
            paymentDate: '2025-01-08',
            paymentTime: '11:30 AM',
            paymentTotal: '₹89,999'
        }
    ];

    // Mock data for rewards history
    const rewardsHistory = [
        {
            id: 'RH001',
            clientOrderId: 'ORD003',
            refundTransactionId: 'RFT003',
            refundDate: '2025-01-12',
            refundTime: '09:30 AM',
            refundedAmount: '₹25,000',
            refundInitiatedBy: 'System',
            refundStatus: 'Completed'
        },
        {
            id: 'RH002',
            clientOrderId: 'ORD004',
            refundTransactionId: 'RFT004',
            refundDate: '2025-01-10',
            refundTime: '03:45 PM',
            refundedAmount: '₹15,500',
            refundInitiatedBy: 'Customer',
            refundStatus: 'Pending'
        }
    ];

    const filteredRefunds = refunds.filter(refund => {
        const matchesSearch =
            refund.clientOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            refund.refundTransactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            refund.paymentTransactionId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const filteredRewardsHistory = rewardsHistory.filter(reward => {
        const matchesSearch =
            reward.clientOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reward.refundTransactionId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleFileUpload = (file) => {
        if (file && file.type === 'text/csv') {
            setUploadedFile(file);
        } else {
            alert('Please upload a valid CSV file');
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const processBulkRefund = () => {
        if (uploadedFile) {
            // Here you would typically process the CSV file
            // For now, we'll just show a success message
            alert('Bulk refund process initiated successfully!');
            setUploadedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDownload = () => {
        const headers = [
            'Client Order ID',
            'Refund Transaction ID',
            'Refund Date & Time',
            'Refunded Amount',
            'Refund initiated by',
            'Payment status',
            'Payment Gateway',
            'Payment Transaction ID',
            'Payment Date & Time',
            'Payment Total'
        ];

        const csvContent = [
            headers.join(','),
            ...filteredRefunds.map(refund => [
                refund.clientOrderId,
                refund.refundTransactionId,
                `${refund.refundDate} ${refund.refundTime}`,
                refund.refundedAmount,
                refund.refundInitiatedBy,
                refund.paymentStatus,
                refund.paymentGateway,
                refund.paymentTransactionId,
                `${refund.paymentDate} ${refund.paymentTime}`,
                refund.paymentTotal
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `refunds_${new Date().toISOString().split('T')[0]}.csv`);
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
                    <h1 className="text-2xl font-bold text-gray-900">Refunds</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['TRANSACTION HISTORY', 'BULK REFUNDS', 'REWARDS HISTORY'].map((tab) => (
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
            {activeTab === 'TRANSACTION HISTORY' && (
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
                                    <option value="Refund Transaction ID">Refund Transaction ID</option>
                                    <option value="Payment Transaction ID">Payment Transaction ID</option>
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

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                                <button className="btn-secondary flex items-center space-x-2">
                                    <RefreshCw size={16} />
                                    <span>Bulk Refund via CSV</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                                >
                                    <Download size={16} />
                                    <span>Download All</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Bulk Refunds CSV Upload */}
            {activeTab === 'BULK REFUNDS' && (
                <Card>
                    <div className="text-center py-12">
                        {!uploadedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 transition-colors ${isDragOver
                                    ? 'border-[#F58220] bg-orange-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="p-4 bg-gray-100 rounded-full">
                                        <Upload size={32} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Upload CSV File for Bulk Refunds
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            Drag and drop your CSV file here, or click to browse
                                        </p>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="btn-primary flex items-center space-x-2 mx-auto"
                                        >
                                            <Upload size={16} />
                                            <span>Upload CSV File</span>
                                        </button>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <FileText size={24} className="text-green-600" />
                                    <div className="text-left">
                                        <p className="font-medium text-green-900">{uploadedFile.name}</p>
                                        <p className="text-sm text-green-600">
                                            {(uploadedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <button
                                        onClick={removeFile}
                                        className="p-1 hover:bg-green-100 rounded-full"
                                    >
                                        <X size={16} className="text-green-600" />
                                    </button>
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={processBulkRefund}
                                        className="btn-primary flex items-center space-x-2"
                                    >
                                        <RefreshCw size={16} />
                                        <span>Process Bulk Refund</span>
                                    </button>
                                    <button
                                        onClick={removeFile}
                                        className="btn-secondary flex items-center space-x-2"
                                    >
                                        <X size={16} />
                                        <span>Remove File</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Rewards History */}
            {activeTab === 'REWARDS HISTORY' && (
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
                                    <option value="Refund Transaction ID">Refund Transaction ID</option>
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

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                                <button className="btn-secondary flex items-center space-x-2">
                                    <RefreshCw size={16} />
                                    <span>Bulk Refund via CSV</span>
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                                >
                                    <Download size={16} />
                                    <span>Download All</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Rewards History Table */}
            {activeTab === 'REWARDS HISTORY' && (
                <Card>
                    <div className="overflow-x-auto">
                        <Table headers={[
                            '',
                            'Client Order ID',
                            'Refund Transaction ID',
                            'Refund Date & Time',
                            'Refunded Amount',
                            'Refund initiated by',
                            'Refund Status'
                        ]}>
                            {filteredRewardsHistory.map((reward) => (
                                <TableRow key={reward.id}>
                                    <TableCell>
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </TableCell>
                                    <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                        {reward.clientOrderId}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700 font-mono">
                                        {reward.refundTransactionId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{reward.refundDate}</div>
                                        <div className="text-xs text-gray-500">{reward.refundTime}</div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {reward.refundedAmount}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {reward.refundInitiatedBy}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${reward.refundStatus === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {reward.refundStatus}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>

                        {filteredRewardsHistory.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-lg font-medium text-gray-900 mb-2">No rewards history found</div>
                                <div className="text-gray-500">Try adjusting your search criteria or date range</div>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Refunds Table */}
            {activeTab === 'TRANSACTION HISTORY' && (
                <Card>
                    <div className="overflow-x-auto">
                        <Table headers={[
                            '',
                            'Client Order ID',
                            'Refund Transaction ID',
                            'Refund Date & Time',
                            'Refunded Amount',
                            'Refund initiated by',
                            'Payment status',
                            'Payment Gateway',
                            'Payment Transaction ID',
                            'Payment Date & Time',
                            'Payment Total'
                        ]}>
                            {filteredRefunds.map((refund) => (
                                <TableRow key={refund.id}>
                                    <TableCell>
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </TableCell>
                                    <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                        {refund.clientOrderId}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700 font-mono">
                                        {refund.refundTransactionId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{refund.refundDate}</div>
                                        <div className="text-xs text-gray-500">{refund.refundTime}</div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {refund.refundedAmount}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {refund.refundInitiatedBy}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${refund.paymentStatus === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {refund.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">
                                        {refund.paymentGateway}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700 font-mono">
                                        {refund.paymentTransactionId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{refund.paymentDate}</div>
                                        <div className="text-xs text-gray-500">{refund.paymentTime}</div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {refund.paymentTotal}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>

                        {filteredRefunds.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-lg font-medium text-gray-900 mb-2">No refunds found</div>
                                <div className="text-gray-500">Try adjusting your search criteria or date range</div>
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Refunds;
