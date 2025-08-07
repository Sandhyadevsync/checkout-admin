import { useState } from 'react';
import { Percent, Plus, Edit, Trash2, Calendar, Users, Tag, Save, Search, ShoppingBag, Copy } from 'lucide-react';

const DiscountSettings = () => {
    const [activeTab, setActiveTab] = useState('coupons');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [deletingCoupon, setDeletingCoupon] = useState(null);
    const [discountType, setDiscountType] = useState('percentage');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const couponsPerPage = 5;
    const [coupons, setCoupons] = useState([
        {
            id: 1,
            code: 'SAVE20',
            name: 'Apply this code and get ₹1 off',
            type: 'Product of Amount',
            tags: ['Fastrr', 'Product of Amount', 'Discount'],
            startDate: '2025-08-07 16:24',
            endDate: '',
            status: 'active',
            createdAt: '2025-01-15T10:30:00.000Z'
        },
        {
            id: 2,
            code: 'KORINMILUXE',
            name: 'Apply this code n get 1 surprise mini product free on 2 big size products',
            type: 'Buy X Get Y',
            tags: ['Fastrr', 'Buy X Get Y', 'Discount'],
            startDate: '2025-08-01 16:43',
            endDate: '2025-08-15 04:05',
            status: 'active',
            createdAt: '2025-01-10T14:20:00.000Z'
        },
        {
            id: 3,
            code: 'WELCOME10',
            name: 'Get 10% off on your first order',
            type: 'Percentage',
            tags: ['Fastrr', 'Percentage', 'Discount'],
            startDate: '2025-01-01 00:00',
            endDate: '2025-12-31 23:59',
            status: 'active',
            createdAt: '2025-01-05T09:15:00.000Z'
        },
        {
            id: 4,
            code: 'FLAT50',
            name: 'Get flat ₹50 off on orders above ₹500',
            type: 'Fixed Amount',
            tags: ['Fastrr', 'Fixed Amount', 'Discount'],
            startDate: '2025-01-20 00:00',
            endDate: '2025-02-20 23:59',
            status: 'active',
            createdAt: '2025-01-20T08:45:00.000Z'
        },
        {
            id: 5,
            code: 'FREESHIP',
            name: 'Free shipping on all orders',
            type: 'Free Shipping',
            tags: ['Fastrr', 'Free Shipping', 'Discount'],
            startDate: '2025-01-25 00:00',
            endDate: '2025-02-25 23:59',
            status: 'active',
            createdAt: '2025-01-25T12:30:00.000Z'
        },
        {
            id: 6,
            code: 'SUMMER25',
            name: 'Summer sale - 25% off on all items',
            type: 'Percentage',
            tags: ['Fastrr', 'Percentage', 'Discount'],
            startDate: '2025-02-01 00:00',
            endDate: '2025-02-28 23:59',
            status: 'active',
            createdAt: '2025-02-01T09:15:00.000Z'
        },
        {
            id: 7,
            code: 'NEWUSER',
            name: 'Special discount for new users',
            type: 'Percentage',
            tags: ['Fastrr', 'Percentage', 'Discount'],
            startDate: '2025-02-05 00:00',
            endDate: '2025-03-05 23:59',
            status: 'active',
            createdAt: '2025-02-05T14:20:00.000Z'
        }
    ]);
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        type: 'percentage',
        value: '',
        maxDiscount: '',
        minOrder: '',
        maxUsagePerCustomer: '',
        totalUsageLimit: '',
        startDate: '',
        endDate: '',
        firstTimeOnly: false,
        excludeSaleItems: false,
        stackWithOthers: false
    });



    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'expired': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateCoupon = () => {
        const newCoupon = {
            id: Date.now(), // Simple ID generation
            code: formData.code,
            name: formData.name,
            type: formData.type === 'percentage' ? 'Percentage' :
                formData.type === 'fixed' ? 'Fixed Amount' : 'Free Shipping',
            tags: ['Fastrr', formData.type === 'percentage' ? 'Percentage' :
                formData.type === 'fixed' ? 'Fixed Amount' : 'Free Shipping', 'Discount'],
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: 'active',
            createdAt: new Date().toISOString() // Add creation timestamp
        };

        setCoupons(prev => [newCoupon, ...prev]); // Add new coupon at the beginning
        setShowCreateModal(false);
        setShowSuccessModal(true);
        setCurrentPage(1); // Reset to first page when new coupon is created

        // Reset form data
        setFormData({
            code: '',
            name: '',
            type: 'percentage',
            value: '',
            maxDiscount: '',
            minOrder: '',
            maxUsagePerCustomer: '',
            totalUsageLimit: '',
            startDate: '',
            endDate: '',
            firstTimeOnly: false,
            excludeSaleItems: false,
            stackWithOthers: false
        });
        setDiscountType('percentage');
    };

    // Filter and sort coupons
    const filteredAndSortedCoupons = coupons
        .filter(coupon =>
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); // Sort by creation date, newest first

    // Calculate pagination
    const totalPages = Math.ceil(filteredAndSortedCoupons.length / couponsPerPage);
    const startIndex = (currentPage - 1) * couponsPerPage;
    const endIndex = startIndex + couponsPerPage;
    const currentCoupons = filteredAndSortedCoupons.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle Edit Coupon
    const handleEditCoupon = (coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            name: coupon.name,
            type: coupon.type === 'Percentage' ? 'percentage' :
                coupon.type === 'Fixed Amount' ? 'fixed' : 'free_shipping',
            value: '',
            maxDiscount: '',
            minOrder: '',
            maxUsagePerCustomer: '',
            totalUsageLimit: '',
            startDate: coupon.startDate.split(' ')[0], // Extract date part
            endDate: coupon.endDate ? coupon.endDate.split(' ')[0] : '',
            firstTimeOnly: false,
            excludeSaleItems: false,
            stackWithOthers: false
        });
        setDiscountType(coupon.type === 'Percentage' ? 'percentage' :
            coupon.type === 'Fixed Amount' ? 'fixed' : 'free_shipping');
        setShowEditModal(true);
    };

    // Handle Update Coupon
    const handleUpdateCoupon = () => {
        const updatedCoupon = {
            ...editingCoupon,
            code: formData.code,
            name: formData.name,
            type: formData.type === 'percentage' ? 'Percentage' :
                formData.type === 'fixed' ? 'Fixed Amount' : 'Free Shipping',
            tags: ['Fastrr', formData.type === 'percentage' ? 'Percentage' :
                formData.type === 'fixed' ? 'Fixed Amount' : 'Free Shipping', 'Discount'],
            startDate: formData.startDate,
            endDate: formData.endDate,
            updatedAt: new Date().toISOString()
        };

        setCoupons(prev => prev.map(coupon =>
            coupon.id === editingCoupon.id ? updatedCoupon : coupon
        ));
        setShowEditModal(false);
        setEditingCoupon(null);
        setShowSuccessModal(true);

        // Reset form data
        setFormData({
            code: '',
            name: '',
            type: 'percentage',
            value: '',
            maxDiscount: '',
            minOrder: '',
            maxUsagePerCustomer: '',
            totalUsageLimit: '',
            startDate: '',
            endDate: '',
            firstTimeOnly: false,
            excludeSaleItems: false,
            stackWithOthers: false
        });
        setDiscountType('percentage');
    };

    // Handle Copy Coupon
    const handleCopyCoupon = (coupon) => {
        const copiedCoupon = {
            ...coupon,
            id: Date.now(),
            code: `${coupon.code}_COPY`,
            name: `${coupon.name} (Copy)`,
            createdAt: new Date().toISOString()
        };

        setCoupons(prev => [copiedCoupon, ...prev]);
        setCurrentPage(1);
        setShowSuccessModal(true);
    };

    // Handle Delete Coupon
    const handleDeleteCoupon = (coupon) => {
        setDeletingCoupon(coupon);
        setShowDeleteModal(true);
    };

    // Confirm Delete
    const confirmDelete = () => {
        setCoupons(prev => prev.filter(coupon => coupon.id !== deletingCoupon.id));
        setShowDeleteModal(false);
        setDeletingCoupon(null);

        // Adjust current page if needed
        const remainingCoupons = coupons.filter(coupon => coupon.id !== deletingCoupon.id);
        const totalPagesAfterDelete = Math.ceil(remainingCoupons.length / couponsPerPage);
        if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
            setCurrentPage(totalPagesAfterDelete);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                        placeholder="Coupon Code Search..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
                        <ShoppingBag size={16} />
                        <span>Import Discount</span>
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-[#F58220] hover:bg-[#E67300] text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                        <Plus size={16} />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('coupons')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'coupons'
                            ? 'border-[#F58220] text-[#F58220]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        ALL DISCOUNT
                    </button>
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'rules'
                            ? 'border-[#F58220] text-[#F58220]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        SUGGESTED DISCOUNTS
                    </button>
                </nav>
            </div>

            {activeTab === 'coupons' && (
                <div className="space-y-4 mt-6">
                    {/* Discount Cards */}
                    <div className="space-y-4">
                        {currentCoupons.map((coupon) => (
                            <div key={coupon.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{coupon.code}</h3>
                                            <div className="flex items-center space-x-2">
                                                {coupon.tags.map((tag, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{coupon.name}</p>
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <div>
                                                <span className="font-medium">Time Period:</span>
                                                <span className="ml-1">Start - {coupon.startDate}</span>
                                            </div>
                                            {coupon.endDate && (
                                                <div>
                                                    <span className="font-medium">End -</span>
                                                    <span className="ml-1">{coupon.endDate}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {/* Toggle Switch */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={coupon.status === 'active'} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                                        </label>
                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEditCoupon(coupon)}
                                                className="p-2 text-gray-400 hover:text-[#F58220] transition-colors"
                                                title="Edit Coupon"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleCopyCoupon(coupon)}
                                                className="p-2 text-gray-400 hover:text-[#F58220] transition-colors"
                                                title="Copy Coupon"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCoupon(coupon)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete Coupon"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedCoupons.length)} of {filteredAndSortedCoupons.length} coupons
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                                ? 'bg-[#F58220] text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === totalPages
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'rules' && (
                <div className="mt-6">
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Tag size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Suggested Discounts</h3>
                        <p className="text-sm text-gray-600">We'll suggest relevant discounts based on your store performance and customer behavior.</p>
                    </div>
                </div>
            )}

            {/* Create Coupon Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Create New Coupon</h3>
                                <p className="text-sm text-gray-600 mt-1">Configure discount coupon settings and rules</p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Coupon Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => handleInputChange('code', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="e.g., SAVE20, FLAT50"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Unique code for customers to use</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Coupon Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="e.g., 20% Off Sale"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Display name for the coupon</p>
                                    </div>
                                </div>
                            </div>

                            {/* Discount Configuration */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Discount Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={discountType}
                                            onChange={(e) => {
                                                setDiscountType(e.target.value);
                                                handleInputChange('type', e.target.value);
                                            }}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        >
                                            <option value="percentage">Percentage Discount</option>
                                            <option value="fixed">Fixed Amount Discount</option>
                                            <option value="free_shipping">Free Shipping</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={formData.value}
                                                onChange={(e) => handleInputChange('value', e.target.value)}
                                                disabled={discountType === 'fixed'}
                                                className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm pr-8 ${discountType === 'fixed' ? 'bg-gray-100 cursor-not-allowed' : ''
                                                    }`}
                                                placeholder="0"
                                            />
                                            <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${discountType === 'fixed' ? 'text-gray-400' : 'text-gray-500'
                                                }`}>%</span>
                                        </div>
                                        {discountType === 'fixed' && (
                                            <p className="text-xs text-gray-500 mt-1">Fixed amount discounts use the Maximum Discount value</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Discount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={formData.maxDiscount}
                                                onChange={(e) => handleInputChange('maxDiscount', e.target.value)}
                                                className="w-full px-3 py-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Usage Limits */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Usage Limits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Order Value
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={formData.minOrder}
                                                onChange={(e) => handleInputChange('minOrder', e.target.value)}
                                                className="w-full px-3 py-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Usage Per Customer
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.maxUsagePerCustomer}
                                            onChange={(e) => handleInputChange('maxUsagePerCustomer', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Usage Limit
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.totalUsageLimit}
                                            onChange={(e) => handleInputChange('totalUsageLimit', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Validity Period */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Validity Period</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Settings */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-900">First-time Customers Only</h5>
                                            <p className="text-xs text-gray-600">Restrict coupon to first-time customers</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-900">Exclude Sale Items</h5>
                                            <p className="text-xs text-gray-600">Cannot be used on items already on sale</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-900">Stack with Other Coupons</h5>
                                            <p className="text-xs text-gray-600">Allow multiple coupons to be used together</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateCoupon}
                                className="px-6 py-2.5 bg-[#F58220] text-white rounded-lg hover:bg-[#E67300] font-medium text-sm transition-colors flex items-center space-x-2"
                            >
                                <Save size={16} />
                                <span>Create Coupon</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-8 text-center">
                        {/* Success Icon */}
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Success Message */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Discount code successfully configured!
                        </h3>

                        {/* Close Button */}
                        <div className="mt-6">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 font-medium text-sm transition-colors"
                            >
                                Done
                            </button>
                        </div>

                        {/* Close Icon */}
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Coupon Modal */}
            {showEditModal && editingCoupon && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Edit Coupon</h3>
                                <p className="text-sm text-gray-600 mt-1">Update discount coupon settings and rules</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingCoupon(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Coupon Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => handleInputChange('code', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="e.g., SAVE20, FLAT50"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Unique code for customers to use</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Coupon Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                            placeholder="e.g., 20% Off Sale"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Display name for the coupon</p>
                                    </div>
                                </div>
                            </div>

                            {/* Discount Configuration */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Discount Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={discountType}
                                            onChange={(e) => {
                                                setDiscountType(e.target.value);
                                                handleInputChange('type', e.target.value);
                                            }}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        >
                                            <option value="percentage">Percentage Discount</option>
                                            <option value="fixed">Fixed Amount Discount</option>
                                            <option value="free_shipping">Free Shipping</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={formData.value}
                                                onChange={(e) => handleInputChange('value', e.target.value)}
                                                disabled={discountType === 'fixed'}
                                                className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm pr-8 ${discountType === 'fixed' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                                placeholder="0"
                                            />
                                            <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${discountType === 'fixed' ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                                        </div>
                                        {discountType === 'fixed' && (
                                            <p className="text-xs text-gray-500 mt-1">Fixed amount discounts use the Maximum Discount value</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Discount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={formData.maxDiscount}
                                                onChange={(e) => handleInputChange('maxDiscount', e.target.value)}
                                                className="w-full px-3 py-2.5 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Validity Period */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Validity Period</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingCoupon(null);
                                }}
                                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCoupon}
                                className="px-6 py-2.5 bg-[#F58220] text-white rounded-lg hover:bg-[#E67300] font-medium text-sm transition-colors flex items-center space-x-2"
                            >
                                <Save size={16} />
                                <span>Update Coupon</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deletingCoupon && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-8 text-center">
                        {/* Warning Icon */}
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        {/* Warning Message */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Delete Coupon
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete the coupon <strong>"{deletingCoupon.code}"</strong>? This action cannot be undone.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeletingCoupon(null);
                                }}
                                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors"
                            >
                                Delete
                            </button>
                        </div>

                        {/* Close Icon */}
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeletingCoupon(null);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscountSettings; 