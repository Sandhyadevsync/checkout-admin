import { useState } from 'react';
import {
    Search,
    Mail,
    Phone,
    Clock,
    DollarSign,
    Send,
    Eye
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { abandonedCarts } from '../data/mockData';

const AbandonedCarts = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCarts = abandonedCarts.filter(cart => {
        return cart.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cart.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cart.id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalValue = abandonedCarts.reduce((sum, cart) => sum + cart.total, 0);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Abandoned</p>
                            <p className="text-2xl font-bold text-gray-900">{abandonedCarts.length}</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full">
                            <Clock className="text-red-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
                            <p className="text-2xl font-bold text-gray-900">12.5%</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Mail className="text-blue-600" size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Cart Value</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(totalValue / abandonedCarts.length).toFixed(0)}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <DollarSign className="text-purple-600" size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Actions */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search abandoned carts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full lg:w-80"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="btn-secondary flex items-center space-x-2">
                            <Mail size={16} />
                            <span>Send Recovery Email</span>
                        </button>
                        <button className="btn-primary flex items-center space-x-2">
                            <Send size={16} />
                            <span>Bulk Recovery</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Abandoned Carts Table */}
            <Card title={`Abandoned Carts (${filteredCarts.length})`}>
                <Table headers={['Cart ID', 'Customer', 'Items', 'Total Value', 'Abandoned At', 'Last Activity', 'Actions']}>
                    {filteredCarts.map((cart) => (
                        <TableRow key={cart.id}>
                            <TableCell className="font-medium">{cart.id}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium text-gray-900">{cart.customer}</div>
                                    <div className="text-gray-500">{cart.email}</div>
                                </div>
                            </TableCell>
                            <TableCell>{cart.items} items</TableCell>
                            <TableCell className="font-medium">₹{cart.total}</TableCell>
                            <TableCell>{cart.abandonedAt}</TableCell>
                            <TableCell className="text-gray-500">{cart.lastActivity}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="btn-primary text-sm px-3 py-1"
                                        title="Send Recovery Email"
                                    >
                                        <Mail size={14} />
                                    </button>
                                    <button
                                        className="btn-secondary text-sm px-3 py-1"
                                        title="View Cart Details"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    <button
                                        className="btn-secondary text-sm px-3 py-1"
                                        title="Call Customer"
                                    >
                                        <Phone size={14} />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {filteredCarts.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-gray-500">No abandoned carts found</div>
                    </div>
                )}
            </Card>

            {/* Recovery Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Recovery Strategies">
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <h4 className="font-medium text-gray-900">Email Recovery</h4>
                                <p className="text-sm text-gray-600">Send personalized emails to remind customers about their abandoned cart</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                                <p className="text-sm text-gray-600">Send SMS reminders for immediate attention</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                                <h4 className="font-medium text-gray-900">Discount Offers</h4>
                                <p className="text-sm text-gray-600">Provide special discounts to encourage completion</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Quick Actions">
                    <div className="space-y-3">
                        <button className="w-full btn-primary">Send Recovery Campaign</button>
                        <button className="w-full btn-secondary">Export Abandoned Carts</button>
                        <button className="w-full btn-secondary">View Recovery Analytics</button>
                        <button className="w-full btn-secondary">Configure Auto Recovery</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AbandonedCarts; 