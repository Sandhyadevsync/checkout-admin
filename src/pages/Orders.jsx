import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    MoreHorizontal
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { recentOrders } from '../data/mockData';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

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

    const filteredOrders = recentOrders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Create New Order Button */}
            <div className="flex justify-end">
                <button className="btn-primary">Create New Order</button>
            </div>

            {/* Filters and Search */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-80"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <button className="btn-secondary flex items-center space-x-2">
                            <Filter size={16} />
                            <span>More Filters</span>
                        </button>
                        <button className="btn-secondary flex items-center space-x-2">
                            <Download size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Orders Table */}
            <Card title={`Orders (${filteredOrders.length})`}>
                <Table headers={['Order ID', 'Customer', 'Amount', 'Status', 'Date', 'Items', 'Actions']}>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium text-gray-900">{order.customer}</div>
                                    <div className="text-gray-500">{order.email}</div>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">₹{order.amount}</TableCell>
                            <TableCell>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items} items</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Details">
                                        <Eye size={16} className="text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Edit Order">
                                        <Edit size={16} className="text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="More Options">
                                        <MoreHorizontal size={16} className="text-gray-600" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-gray-500">No orders found matching your criteria</div>
                    </div>
                )}
            </Card>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{recentOrders.length}</div>
                        <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {recentOrders.filter(o => o.status === 'Delivered').length}
                        </div>
                        <div className="text-sm text-gray-600">Delivered</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {recentOrders.filter(o => o.status === 'Processing').length}
                        </div>
                        <div className="text-sm text-gray-600">Processing</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {recentOrders.filter(o => o.status === 'Shipped').length}
                        </div>
                        <div className="text-sm text-gray-600">Shipped</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Orders; 