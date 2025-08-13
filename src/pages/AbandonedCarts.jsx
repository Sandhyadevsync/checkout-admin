import { useState } from 'react';
import {
    Search,
    Download,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    User,
    Mail,
    Phone
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const AbandonedCarts = () => {
    const [dateRange, setDateRange] = useState('2025-08-05 → 2025-08-11');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date('2025-08-05'));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date('2025-08-11'));
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Cart ID');
    const [channelFilter, setChannelFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    // Mock data for abandoned carts
    const abandonedCarts = [
        {
            id: 'CART001',
            customerName: 'John Doe',
            cartDetails: 'iPhone 15 Pro, AirPods Pro',
            cartValue: '₹1,49,999',
            checkoutStage: 'Payment',
            recoveryStatus: 'Pending',
            fastrrOrderId: 'FR001',
            lastNotified: '2 hours ago',
            source: 'Website',
            date: '2025-01-15',
            time: '10:30 AM'
        },
        {
            id: 'CART002',
            customerName: 'Jane Smith',
            cartDetails: 'MacBook Air, Magic Mouse',
            cartValue: '₹89,999',
            checkoutStage: 'Shipping',
            recoveryStatus: 'Recovered',
            fastrrOrderId: 'FR002',
            lastNotified: '1 day ago',
            source: 'Mobile App',
            date: '2025-01-14',
            time: '02:15 PM'
        },
        {
            id: 'CART003',
            customerName: 'Mike Johnson',
            cartDetails: 'iPad Pro, Apple Pencil',
            cartValue: '₹79,999',
            checkoutStage: 'Review',
            recoveryStatus: 'Failed',
            fastrrOrderId: 'FR003',
            lastNotified: '3 days ago',
            source: 'Website',
            date: '2025-01-13',
            time: '11:45 AM'
        }
    ];

    const filteredCarts = abandonedCarts.filter(cart => {
        const matchesSearch =
            cart.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cart.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cart.fastrrOrderId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCartId = searchCriteria === 'Cart ID' || cart.id.includes(searchTerm);

        return matchesSearch && matchesCartId;
    });

    const handleDownload = () => {
        // Create CSV content
        const headers = [
            'Cart ID',
            'Date & Time',
            'Customer Name',
            'Cart Details',
            'Cart Value',
            'Checkout Stage',
            'Recovery Status',
            'Fastrr Order ID',
            'Last Notified',
            'Source'
        ];

        const csvContent = [
            headers.join(','),
            ...filteredCarts.map(cart => [
                cart.id,
                `${cart.date} ${cart.time}`,
                cart.customerName,
                cart.cartDetails,
                cart.cartValue,
                cart.checkoutStage,
                cart.recoveryStatus,
                cart.fastrrOrderId,
                cart.lastNotified,
                cart.source
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `abandoned_carts_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getRecoveryStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Recovered': 'bg-green-100 text-green-800',
            'Failed': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getCheckoutStageColor = (stage) => {
        const colors = {
            'Payment': 'bg-blue-100 text-blue-800',
            'Shipping': 'bg-purple-100 text-purple-800',
            'Review': 'bg-orange-100 text-orange-800'
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
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
    };

    const applyDateRange = () => {
        if (selectedStartDate && selectedEndDate) {
            setDateRange(`${formatDate(selectedStartDate)} → ${formatDate(selectedEndDate)}`);
        }
    };

    const renderCalendar = (monthOffset = 0) => {
        const displayDate = new Date(selectedStartDate); // Use selectedStartDate for calendar rendering
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
            {/* Header and Date Picker */}
            <div className="flex items-center justify-end">
                {/* Date Range Picker */}
                <div className="relative">
                    <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Calendar size={16} />
                        <span>{dateRange}</span>
                        <ChevronDown size={16} />
                    </button>
                    {showDatePicker && (
                        <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Select Date Range</h3>
                                    <button onClick={() => setShowDatePicker(false)} className="text-gray-500 hover:text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => handleQuickSelect('today')} className="btn-secondary">Today</button>
                                    <button onClick={() => handleQuickSelect('yesterday')} className="btn-secondary">Yesterday</button>
                                    <button onClick={() => handleQuickSelect('last7days')} className="btn-secondary">Last 7 Days</button>
                                    <button onClick={() => handleQuickSelect('thisMonth')} className="btn-secondary">This Month</button>
                                    <button onClick={() => handleQuickSelect('last30days')} className="btn-secondary">Last 30 Days</button>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button onClick={applyDateRange} className="btn-primary">Apply</button>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Select Month</h4>
                                <div className="flex justify-between items-center">
                                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-gray-500 hover:text-gray-700">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-lg font-semibold text-gray-900">{currentMonth.toLocaleString('default', { month: 'numeric' })}</span>
                                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-gray-500 hover:text-gray-700">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 mt-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-sm text-gray-500">{day}</div>
                                    ))}
                                    {renderCalendar()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="flex flex-wrap gap-6">
                <Card className="w-64">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">-</div>
                        <div className="text-sm text-gray-600">Total Abandoned Checkouts</div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">-</div>
                        <div className="text-sm text-gray-600">Abandoned Checkouts Resumed</div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">-</div>
                        <div className="text-sm text-gray-600">Abandoned Checkouts Converted</div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">-</div>
                        <div className="text-sm text-gray-600">Retargeting Success Rate</div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">-</div>
                        <div className="text-sm text-gray-600">Resumed Checkout Conversion</div>
                    </div>
                </Card>
            </div>

            {/* Search and Download */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Cart ID Filter */}
                        <div className="relative">
                            <select
                                value={searchCriteria}
                                onChange={(e) => setSearchCriteria(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] bg-white cursor-pointer w-full sm:w-40"
                            >
                                <option value="Cart ID">Cart ID</option>
                                <option value="Fastrr Order ID">Fastrr Order ID</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
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

            {/* Abandoned Carts Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={[
                        'Cart ID',
                        'Date & Time',
                        'Customer Name',
                        'Cart Details',
                        'Cart Value',
                        'Checkout Stage',
                        'Recovery Status',
                        'Fastrr order id',
                        'Last Notified',
                        'Source'
                    ]}>
                        {filteredCarts.map((cart) => (
                            <TableRow key={cart.id}>
                                <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                    {cart.id}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-900">{cart.date}</div>
                                    <div className="text-xs text-gray-500">{cart.time}</div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {cart.customerName}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {cart.cartDetails}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-900">
                                    {cart.cartValue}
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCheckoutStageColor(cart.checkoutStage)}`}>
                                        {cart.checkoutStage}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRecoveryStatusColor(cart.recoveryStatus)}`}>
                                        {cart.recoveryStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700 font-mono">
                                    {cart.fastrrOrderId}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {cart.lastNotified}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {cart.source}
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>

                    {filteredCarts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-lg font-medium text-gray-900 mb-2">No abandoned carts found</div>
                            <div className="text-gray-500">Try adjusting your search criteria or filters</div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AbandonedCarts; 