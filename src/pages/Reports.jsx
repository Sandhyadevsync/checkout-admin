import { useState } from 'react';
import {
    Plus,
    Download,
    Eye,
    Trash2,
    Filter,
    Search,
    Calendar,
    FileText,
    BarChart3,
    PieChart,
    TrendingUp,
    Users,
    DollarSign
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const Reports = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportTypeFilter, setReportTypeFilter] = useState('All');
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [newReport, setNewReport] = useState({
        type: 'Select Report Type',
        emails: '',
        startDate: '',
        endDate: ''
    });

    // Mock data for reports
    const reports = [
        {
            id: 'RPT001',
            generatedOn: '2025-01-15',
            reportName: 'Monthly Sales Report',
            reportType: 'Sales Report',
            generatedBy: 'Admin User',
            duration: 'Last 30 Days',
            status: 'Completed',
            downloadUrl: '#'
        },
        {
            id: 'RPT002',
            generatedOn: '2025-01-10',
            reportName: 'Customer Analytics',
            reportType: 'Customer Report',
            generatedBy: 'System',
            duration: 'Last 7 Days',
            status: 'Completed',
            downloadUrl: '#'
        },
        {
            id: 'RPT003',
            generatedOn: '2025-01-05',
            reportName: 'Inventory Status',
            reportType: 'Inventory Report',
            generatedBy: 'Manager',
            duration: 'Last 24 Hours',
            status: 'Processing',
            downloadUrl: '#'
        }
    ];

    const reportTypes = [
        'All',
        'Sales Report',
        'Customer Report',
        'Inventory Report',
        'Financial Report',
        'Performance Report'
    ];

    const modalReportTypes = [
        'Select Report Type',
        'Sales Report',
        'Customer Report',
        'Inventory Report',
        'Financial Report',
        'Performance Report'
    ];

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = reportTypeFilter === 'All' || report.reportType === reportTypeFilter;

        return matchesSearch && matchesType;
    });

    const handleGenerateReport = () => {
        // Check if required fields are filled
        if (newReport.type && newReport.type !== 'Select Report Type') {
            // Here you would typically make an API call to generate the report
            console.log('Generating report:', newReport);

            // Show success message
            alert('Report generation initiated successfully!');

            // Close modal and reset form
            setShowGenerateModal(false);
            setNewReport({
                type: 'Select Report Type',
                emails: '',
                startDate: '',
                endDate: ''
            });
        } else {
            // Show validation error
            alert('Please select a report type to continue.');
        }
    };

    const handleDownload = (reportId) => {
        // Here you would typically trigger the download
        console.log('Downloading report:', reportId);
    };

    const handleDelete = (reportId) => {
        // Here you would typically make an API call to delete the report
        console.log('Deleting report:', reportId);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    {/* Left side empty for now */}
                </div>
                <button
                    onClick={() => setShowGenerateModal(true)}
                    className="btn-primary flex items-center space-x-2 hover:bg-[#d6731a] transition-colors"
                >
                    <Plus size={16} />
                    <span>Generate new report</span>
                </button>
            </div>

            {/* Filters and Search */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Report Type Filter */}
                        <div className="relative">
                            <select
                                value={reportTypeFilter}
                                onChange={(e) => setReportTypeFilter(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] bg-white cursor-pointer w-full sm:w-40"
                            >
                                {reportTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] w-full sm:w-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            {filteredReports.length} of {reports.length} reports
                        </span>
                    </div>
                </div>
            </Card>

            {/* Reports Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={[
                        'Generated On',
                        'Report Name',
                        'Report Type',
                        'Generated By',
                        'Duration',
                        'Status',
                        'Action'
                    ]}>
                        {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="text-sm text-gray-900">{report.generatedOn}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <FileText size={16} className="text-blue-500" />
                                        <span className="font-medium text-blue-600 cursor-pointer hover:underline">
                                            {report.reportName}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {report.reportType}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-gray-700">
                                    {report.generatedBy}
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                    {report.duration}
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {report.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDownload(report.id)}
                                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Download"
                                        >
                                            <Download size={16} />
                                        </button>
                                        <button
                                            onClick={() => console.log('View report:', report.id)}
                                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                            title="View"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(report.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>

                    {filteredReports.length === 0 && (
                        <div className="text-center py-12">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    {/* Monitor illustration */}
                                    <div className="w-32 h-24 border-2 border-purple-300 rounded-lg relative">
                                        <div className="absolute inset-2 bg-purple-50 rounded flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-2xl mb-1">😞</div>
                                                <div className="text-xs font-medium text-purple-600">NO DATA</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Monitor stand */}
                                    <div className="w-2 h-4 bg-purple-300 mx-auto mt-1"></div>
                                    <div className="w-8 h-1 bg-purple-300 mx-auto"></div>
                                </div>

                                {/* Person illustration */}
                                <div className="relative">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                                        <span className="text-xs">?</span>
                                    </div>
                                </div>

                                <div className="text-lg font-medium text-gray-900">No reports found</div>
                                <div className="text-gray-500">Generate your first report to get started</div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Generate Report Modal */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Generate New Report</h3>
                            <button
                                onClick={() => setShowGenerateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Report Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newReport.type}
                                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] ${newReport.type === 'Select Report Type' ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                >
                                    {modalReportTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {newReport.type === 'Select Report Type' && (
                                    <p className="text-xs text-red-500 mt-1">Please select a report type</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    Emails
                                    <div className="ml-2 w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-gray-600">i</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={newReport.emails}
                                    onChange={(e) => setNewReport({ ...newReport, emails: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                    placeholder="Comma separated emails"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date Range
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="date"
                                        value={newReport.startDate}
                                        onChange={(e) => setNewReport({ ...newReport, startDate: e.target.value })}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                        placeholder="Start date"
                                    />
                                    <span className="text-gray-400">→</span>
                                    <div className="flex-1 relative">
                                        <input
                                            type="date"
                                            value={newReport.endDate}
                                            onChange={(e) => setNewReport({ ...newReport, endDate: e.target.value })}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="End date"
                                        />
                                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleGenerateReport}
                                disabled={newReport.type === 'Select Report Type'}
                                className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 shadow-lg ${newReport.type === 'Select Report Type'
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#F58220] text-white hover:bg-[#d6731a]'
                                    }`}
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports; 