import {
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Users,
    Package,
    Eye
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import { dashboardStats, recentOrders } from '../data/mockData';

const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
        blue: 'text-[#F58220] bg-[#FFF2E6]',
        green: 'text-[#F58220] bg-[#FFF2E6]',
        purple: 'text-[#F58220] bg-[#FFF2E6]',
        orange: 'text-[#F58220] bg-[#FFF2E6]'
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[#333333]">{title}</p>
                    <p className="text-lg font-bold text-[#000000]">{value}</p>
                    {change && (
                        <div className="flex items-center mt-1">
                            <TrendingUp className="text-[#F58220]" size={14} />
                            <span className="text-sm text-[#F58220] ml-1">+{change}%</span>
                        </div>
                    )}
                </div>
                <div className={`p-2.5 rounded-full ${colorClasses[color]}`}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Orders',
            value: dashboardStats.totalOrders.toLocaleString(),
            change: dashboardStats.monthlyGrowth,
            icon: ShoppingCart,
            color: 'blue'
        },
        {
            title: 'Total Revenue',
            value: `₹${dashboardStats.totalRevenue.toLocaleString()}`,
            change: dashboardStats.monthlyGrowth,
            icon: DollarSign,
            color: 'green'
        },
        {
            title: 'Abandoned Carts',
            value: dashboardStats.abandonedCarts,
            icon: Package,
            color: 'orange'
        },
        {
            title: 'Conversion Rate',
            value: `${dashboardStats.conversionRate}%`,
            icon: Eye,
            color: 'purple'
        }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Delivered': 'bg-green-100 text-green-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Orders */}
            <Card
                title="Recent Orders"
                subtitle="Latest orders from your customers"
                action={
                    <button className="text-[#F58220] hover:text-[#E67300] text-sm font-medium">
                        View All
                    </button>
                }
            >
                <Table headers={['Order ID', 'Customer', 'Amount', 'Status', 'Date', 'Items']}>
                    {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium text-[#000000] text-sm">{order.customer}</div>
                                    <div className="text-[#333333] text-sm">{order.email}</div>
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
                        </TableRow>
                    ))}
                </Table>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Quick Actions">
                    <div className="space-y-2.5">
                        <button className="w-full btn-primary">Create New Order</button>
                        <button className="w-full btn-secondary">View Reports</button>
                        <button className="w-full btn-secondary">Manage Inventory</button>
                    </div>
                </Card>

                <Card title="Recent Activity">
                    <div className="space-y-2.5">
                        <div className="flex items-center space-x-2.5">
                            <div className="w-1.5 h-1.5 bg-[#F58220] rounded-full"></div>
                            <div className="text-sm">
                                <div className="font-medium">New order received</div>
                                <div className="text-[#333333]">2 minutes ago</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <div className="w-1.5 h-1.5 bg-[#F58220] rounded-full"></div>
                            <div className="text-sm">
                                <div className="font-medium">Payment processed</div>
                                <div className="text-[#333333]">15 minutes ago</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2.5">
                            <div className="w-1.5 h-1.5 bg-[#F58220] rounded-full"></div>
                            <div className="text-sm">
                                <div className="font-medium">Order shipped</div>
                                <div className="text-[#333333]">1 hour ago</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Performance">
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Monthly Growth</span>
                                <span className="font-medium">+{dashboardStats.monthlyGrowth}%</span>
                            </div>
                            <div className="w-full bg-[#D3D3D3] rounded-full h-1.5 mt-1">
                                <div
                                    className="bg-[#F58220] h-1.5 rounded-full"
                                    style={{ width: `${dashboardStats.monthlyGrowth}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm">
                                <span>Conversion Rate</span>
                                <span className="font-medium">{dashboardStats.conversionRate}%</span>
                            </div>
                            <div className="w-full bg-[#D3D3D3] rounded-full h-1.5 mt-1">
                                <div
                                    className="bg-[#F58220] h-1.5 rounded-full"
                                    style={{ width: `${dashboardStats.conversionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard; 