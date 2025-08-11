import { useState } from 'react';
import {
    Search,
    Download,
    Eye,
    Edit,
    MoreHorizontal,
    Phone,
    Clock,
    AlertCircle,
    ChevronDown
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { recentOrders } from '../data/mockData';

const PendingOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [phoneFilter, setPhoneFilter] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('all');

    const getPaymentStatusColor = (status) => {
        const colors = {
            'Paid': 'bg-green-100 text-green-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Refunded': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    // Filter only pending orders
    const pendingOrders = recentOrders.filter(order => order.status === 'Pending');

    const filteredOrders = pendingOrders.filter(order => {
        let matchesSearch = false;

        switch (searchCriteria) {
            case 'phone':
                matchesSearch = order.phone.toLowerCase().includes(searchTerm.toLowerCase());
                break;
            case 'orderId':
                matchesSearch = order.clientOrderId.toLowerCase().includes(searchTerm.toLowerCase());
                break;
            case 'platformId':
                matchesSearch = order.pgTransactionId.toLowerCase().includes(searchTerm.toLowerCase());
                break;
            case 'all':
            default:
                matchesSearch =
                    order.clientOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.pgTransactionId.toLowerCase().includes(searchTerm.toLowerCase());
                break;
        }

        const matchesPhone = phoneFilter === '' || order.phone.includes(phoneFilter);

        return matchesSearch && matchesPhone;
    });

    const totalPendingAmount = filteredOrders.reduce((sum, order) => {
        const amount = parseFloat(order.amount.replace(/,/g, ''));
        return sum + amount;
    }, 0);

    const codOrders = filteredOrders.filter(order => order.paymentMethod === 'COD').length;
    const prepaidOrders = filteredOrders.filter(order => order.paymentMethod !== 'COD').length;

    const handleDownload = () => {
        // Create CSV content
        const headers = [
            'Client Order ID',
            'Date',
            'Time',
            'Customer',
            'Email',
            'Phone',
            'Payment Total',
            'Payment Status',
            'Payment Mode',
            'Delivery Method',
            'Tags',
            'Payment Gateway',
            'PG Transaction ID',
            'Source',
            'Items',
            'Discount Total',
            'Discount Name'
        ];

        const csvContent = [
            headers.join(','),
            ...filteredOrders.map(order => [
                order.clientOrderId,
                order.date,
                order.time,
                order.customer,
                order.email,
                order.phone,
                order.amount,
                order.paymentStatus,
                order.paymentMethod,
                order.deliveryMethod,
                order.tags.join('; '),
                order.paymentGateway,
                order.pgTransactionId,
                order.source,
                order.items,
                order.discountTotal,
                order.discountName
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `pending_orders_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getSearchPlaceholder = () => {
        switch (searchCriteria) {
            case 'phone':
                return 'Search by phone number...';
            case 'orderId':
                return 'Search by order ID...';
            case 'platformId':
                return 'Search by platform ID...';
            case 'all':
            default:
                return 'Search...';
        }
    };

    return (
        <div className="space-y-6">

            {/* Statistics Cards */}
            <div className="flex flex-wrap gap-6">
                <Card className="w-64">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-orange-600">{filteredOrders.length}</div>
                            <div className="text-sm text-gray-600">Total Pending</div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Clock size={24} className="text-orange-500" />
                        </div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{codOrders}</div>
                            <div className="text-sm text-gray-600">Cash on Delivery</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <AlertCircle size={24} className="text-blue-500" />
                        </div>
                    </div>
                </Card>

                <Card className="w-64">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-green-600">{prepaidOrders}</div>
                            <div className="text-sm text-gray-600">Prepaid Orders</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <AlertCircle size={24} className="text-green-500" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters and Search */}
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
                                <option value="all">All Fields</option>
                                <option value="phone">Phone Number</option>
                                <option value="orderId">Order ID</option>
                                <option value="platformId">Platform ID</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder={getSearchPlaceholder()}
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

            {/* Pending Orders Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={[
                        'Client Order ID',
                        'Date & Time',
                        'Customer',
                        'Payment Total',
                        'Payment Status',
                        'Payment Mode',
                        'Delivery Method',
                        'Tags',
                        'Payment Gateway',
                        'PG Transaction ID',
                        'Source',
                        'Items',
                        'Discount Total',
                        'Discount Name',
                        'Action'
                    ]}>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium text-blue-600 cursor-pointer hover:underline">
                                    {order.clientOrderId}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-900">{order.date}</div>
                                    <div className="text-xs text-gray-500">{order.time}</div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900">{order.customer}</div>
                                        <div className="text-sm text-gray-500">{order.email}</div>
                                        <div className="text-xs text-gray-400">{order.phone}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold text-gray-900">
                                    ₹{order.amount}
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.paymentMethod}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.deliveryMethod}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {order.tags.map((tag, index) => (
                                            <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.paymentGateway}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700 font-mono">
                                    {order.pgTransactionId}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.source}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.items} items
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.discountTotal === '0' ? '-' : `₹${order.discountTotal}`}
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {order.discountName === 'No Discount' ? '-' : order.discountName}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="View Details">
                                            <Eye size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Edit Order">
                                            <Edit size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="More Options">
                                            <MoreHorizontal size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                            <div className="text-lg font-medium text-gray-900 mb-2">No pending orders found</div>
                            <div className="text-gray-500">
                                {searchTerm || phoneFilter
                                    ? 'Try adjusting your search criteria or filters'
                                    : 'All orders have been processed!'
                                }
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default PendingOrders;
