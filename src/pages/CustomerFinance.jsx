import { useState } from 'react';
import {
    Download,
    Calendar,
    ChevronDown,
    Search,
    ChevronDown as FilterIcon
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const CustomerFinance = () => {
    const [startDate, setStartDate] = useState(new Date('2025-08-05'));
    const [endDate, setEndDate] = useState(new Date('2025-08-11'));
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Client Order ID');

    const handleDateRangeChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    // Mock data for customer finance
    const customerFinanceData = [
        {
            id: 'TXN001',
            date: '2025-01-15',
            time: '10:30 AM',
            prepaidTransactionId: 'PT001',
            customer: 'John Doe',
            paymentMethod: 'Credit Card',
            paymentAmount: 1500.00
        },
        {
            id: 'TXN002',
            date: '2025-01-14',
            time: '02:15 PM',
            prepaidTransactionId: 'PT002',
            customer: 'Jane Smith',
            paymentMethod: 'Debit Card',
            paymentAmount: 2300.50
        },
        {
            id: 'TXN003',
            date: '2025-01-13',
            time: '11:45 AM',
            prepaidTransactionId: 'PT003',
            customer: 'Mike Johnson',
            paymentMethod: 'UPI',
            paymentAmount: 890.75
        }
    ];

    const filteredData = customerFinanceData.filter(item => {
        const matchesSearch = searchTerm === '' ||
            item[searchCriteria.toLowerCase().replace(/\s+/g, '')]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase());
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
            ...filteredData.map(item => [
                item.id,
                `${item.date} ${item.time}`,
                item.prepaidTransactionId,
                item.customer,
                item.paymentMethod,
                item.paymentAmount
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `customer_finance_${new Date().toISOString().split('T')[0]}.csv`);
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
                    <h1 className="text-2xl font-bold text-gray-900">Customer Finance</h1>
                </div>
            </div>

            {/* Payment Amount Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">₹0.00</div>
                            <div className="text-sm text-gray-600">Payment Amount</div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Calendar size={24} className="text-orange-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search Criteria Dropdown */}
                <div className="relative">
                    <select
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="Client Order ID">Client Order ID</option>
                        <option value="Customer">Customer</option>
                        <option value="Transaction ID">Transaction ID</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Search Input */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Download size={16} />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Transactions Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <thead>
                            <tr>
                                <th className="table-header">Order ID</th>
                                <th className="table-header">Date & Time</th>
                                <th className="table-header">Prepaid Transaction ID</th>
                                <th className="table-header">Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.date} {item.time}</TableCell>
                                    <TableCell>{item.prepaidTransactionId}</TableCell>
                                    <TableCell>{item.customer}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default CustomerFinance;
