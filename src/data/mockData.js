// Mock data for the admin panel

export const dashboardStats = {
    totalOrders: 1247,
    totalRevenue: 284750,
    totalCustomers: 892,
    abandonedCarts: 89,
    conversionRate: 12.5,
    avgOrderValue: 228.5,
    monthlyGrowth: 8.2,
    newCustomers: 89,
    repeatCustomers: 1158
};

// Traffic Acquisition Data
export const trafficAcquisitionData = [
    {
        source: '(direct) / (none) / (none)',
        checkouts: 6,
        orders: 0,
        revenue: 0,
        conversion: '-'
    },
    {
        source: 'korinmi.com / referral / (none)',
        checkouts: 1,
        orders: 0,
        revenue: 0,
        conversion: '-'
    },
    {
        source: 'l.instagram.com / referral / (none)',
        checkouts: 1,
        orders: 0,
        revenue: 0,
        conversion: '-'
    },
    {
        source: 'google.com / organic / (none)',
        checkouts: 3,
        orders: 1,
        revenue: 150,
        conversion: '33.33%'
    },
    {
        source: 'facebook.com / social / (none)',
        checkouts: 2,
        orders: 0,
        revenue: 0,
        conversion: '-'
    },
    {
        source: 'email / newsletter / (none)',
        checkouts: 4,
        orders: 2,
        revenue: 300,
        conversion: '50%'
    },
    {
        source: 'bing.com / organic / (none)',
        checkouts: 1,
        orders: 0,
        revenue: 0,
        conversion: '-'
    }
];

// Payment Mode Data
export const paymentModeData = [
    {
        mode: 'Credit/Debit Card',
        checkouts: 45,
        orders: 12,
        gmv: 2840,
        percentageCompletion: '26.67%'
    },
    {
        mode: 'UPI',
        checkouts: 32,
        orders: 8,
        gmv: 1890,
        percentageCompletion: '25.00%',
        subModes: [
            { mode: 'gpay', checkouts: 18, orders: 5, gmv: 1120, percentageCompletion: '27.78%' },
            { mode: 'PhonePe', checkouts: 14, orders: 3, gmv: 770, percentageCompletion: '21.43%' }
        ]
    },
    {
        mode: 'Net Banking',
        checkouts: 28,
        orders: 6,
        gmv: 1560,
        percentageCompletion: '21.43%'
    },
    {
        mode: 'Wallet',
        checkouts: 15,
        orders: 3,
        gmv: 890,
        percentageCompletion: '20.00%'
    }
];

// Discounts Analytics Data
export const discountsAnalyticsData = [
    {
        code: 'KORINMIGIFT',
        type: 'discount',
        totalOrders: 0,
        conversion: '0.00%',
        totalGMV: 0,
        totalDiscountAmount: 0,
        totalAttempts: 0.00,
        totalApplied: 0.00,
        errorRate: '100.00'
    },
    {
        code: 'KORINMILOVE',
        type: 'discount',
        totalOrders: 0,
        conversion: '0.00%',
        totalGMV: 0,
        totalDiscountAmount: 0,
        totalAttempts: 1.00,
        totalApplied: 1.00,
        errorRate: '0.00'
    },
    {
        code: 'WELCOME10',
        type: 'percentage',
        totalOrders: 15,
        conversion: '12.50%',
        totalGMV: 2840,
        totalDiscountAmount: 284,
        totalAttempts: 120,
        totalApplied: 15,
        errorRate: '87.50'
    },
    {
        code: 'SAVE20',
        type: 'fixed',
        totalOrders: 8,
        conversion: '8.00%',
        totalGMV: 1890,
        totalDiscountAmount: 160,
        totalAttempts: 100,
        totalApplied: 8,
        errorRate: '92.00'
    },
    {
        code: 'FIRSTORDER',
        type: 'discount',
        totalOrders: 22,
        conversion: '18.33%',
        totalGMV: 4560,
        totalDiscountAmount: 456,
        totalAttempts: 120,
        totalApplied: 22,
        errorRate: '81.67'
    }
];

// User Feedback Data
export const userFeedbackData = [
    {
        id: 1,
        customerName: 'John Doe',
        email: 'john@example.com',
        rating: 5,
        feedback: 'Excellent service! The checkout process was smooth and fast.',
        category: 'Service',
        status: 'Resolved',
        date: '2024-01-15'
    },
    {
        id: 2,
        customerName: 'Jane Smith',
        email: 'jane@example.com',
        rating: 4,
        feedback: 'Good experience overall, but could improve mobile responsiveness.',
        category: 'UI/UX',
        status: 'In Progress',
        date: '2024-01-14'
    },
    {
        id: 3,
        customerName: 'Mike Johnson',
        email: 'mike@example.com',
        rating: 3,
        feedback: 'Payment gateway had some issues during checkout.',
        category: 'Technical',
        status: 'Pending',
        date: '2024-01-13'
    }
];

export const recentOrders = [
    {
        id: 'ORD001',
        clientOrderId: 'CLI001',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        amount: '2,499',
        status: 'Delivered',
        date: '2024-01-15',
        time: '10:30 AM',
        items: 3,
        category: 'Electronics',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        deliveryMethod: 'Standard Delivery',
        tags: ['Premium', 'Express'],
        paymentGateway: 'Razorpay',
        pgTransactionId: 'TXN001234',
        source: 'Website',
        discountTotal: '150',
        discountName: 'Welcome Discount'
    },
    {
        id: 'ORD002',
        clientOrderId: 'CLI002',
        customer: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+91 98765 43211',
        amount: '1,299',
        status: 'Processing',
        date: '2024-01-15',
        time: '11:45 AM',
        items: 2,
        category: 'Fashion',
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        deliveryMethod: 'Express Delivery',
        tags: ['Fashion', 'New'],
        paymentGateway: 'PayU',
        pgTransactionId: 'TXN001235',
        source: 'Mobile App',
        discountTotal: '0',
        discountName: 'No Discount'
    },
    {
        id: 'ORD003',
        clientOrderId: 'CLI003',
        customer: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+91 98765 43212',
        amount: '3,999',
        status: 'Shipped',
        date: '2024-01-14',
        time: '02:15 PM',
        items: 1,
        category: 'Home & Garden',
        paymentMethod: 'Net Banking',
        paymentStatus: 'Paid',
        deliveryMethod: 'Standard Delivery',
        tags: ['Home', 'Garden'],
        paymentGateway: 'HDFC Bank',
        pgTransactionId: 'TXN001236',
        source: 'Website',
        discountTotal: '200',
        discountName: 'Seasonal Sale'
    },
    {
        id: 'ORD004',
        clientOrderId: 'CLI004',
        customer: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+91 98765 43213',
        amount: '899',
        status: 'Pending',
        date: '2024-01-14',
        time: '04:30 PM',
        items: 4,
        category: 'Books',
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        deliveryMethod: 'Standard Delivery',
        tags: ['Books', 'Education'],
        paymentGateway: 'COD',
        pgTransactionId: 'N/A',
        source: 'Website',
        discountTotal: '50',
        discountName: 'Student Discount'
    },
    {
        id: 'ORD005',
        clientOrderId: 'CLI005',
        customer: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+91 98765 43214',
        amount: '5,499',
        status: 'Delivered',
        date: '2024-01-13',
        time: '09:15 AM',
        items: 2,
        category: 'Electronics',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        deliveryMethod: 'Express Delivery',
        tags: ['Electronics', 'Premium'],
        paymentGateway: 'Stripe',
        pgTransactionId: 'TXN001237',
        source: 'Mobile App',
        discountTotal: '300',
        discountName: 'Loyalty Discount'
    },
    {
        id: 'ORD006',
        clientOrderId: 'CLI006',
        customer: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+91 98765 43215',
        amount: '1,799',
        status: 'Cancelled',
        date: '2024-01-13',
        time: '01:20 PM',
        items: 1,
        category: 'Fashion',
        paymentMethod: 'UPI',
        paymentStatus: 'Refunded',
        deliveryMethod: 'Standard Delivery',
        tags: ['Fashion', 'Cancelled'],
        paymentGateway: 'PayU',
        pgTransactionId: 'TXN001238',
        source: 'Website',
        discountTotal: '0',
        discountName: 'No Discount'
    },
    {
        id: 'ORD007',
        clientOrderId: 'CLI007',
        customer: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        phone: '+91 98765 43216',
        amount: '2,899',
        status: 'Processing',
        date: '2024-01-12',
        time: '03:45 PM',
        items: 3,
        category: 'Sports',
        paymentMethod: 'Net Banking',
        paymentStatus: 'Paid',
        deliveryMethod: 'Standard Delivery',
        tags: ['Sports', 'Fitness'],
        paymentGateway: 'ICICI Bank',
        pgTransactionId: 'TXN001239',
        source: 'Website',
        discountTotal: '150',
        discountName: 'Sports Discount'
    },
    {
        id: 'ORD008',
        clientOrderId: 'CLI008',
        customer: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        phone: '+91 98765 43217',
        amount: '999',
        status: 'Pending',
        date: '2024-01-12',
        time: '06:10 PM',
        items: 2,
        category: 'Beauty',
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        deliveryMethod: 'Standard Delivery',
        tags: ['Beauty', 'New'],
        paymentGateway: 'COD',
        pgTransactionId: 'N/A',
        source: 'Mobile App',
        discountTotal: '0',
        discountName: 'No Discount'
    },
    {
        id: 'ORD009',
        clientOrderId: 'CLI009',
        customer: 'James Taylor',
        email: 'james.taylor@example.com',
        phone: '+91 98765 43218',
        amount: '4,299',
        status: 'Shipped',
        date: '2024-01-11',
        time: '10:00 AM',
        items: 1,
        category: 'Electronics',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        deliveryMethod: 'Express Delivery',
        tags: ['Electronics', 'Premium'],
        paymentGateway: 'Razorpay',
        pgTransactionId: 'TXN001240',
        source: 'Website',
        discountTotal: '250',
        discountName: 'Early Bird Discount'
    },
    {
        id: 'ORD010',
        clientOrderId: 'CLI010',
        customer: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        phone: '+91 98765 43219',
        amount: '1,599',
        status: 'Delivered',
        date: '2024-01-11',
        time: '02:30 PM',
        items: 3,
        category: 'Fashion',
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        deliveryMethod: 'Standard Delivery',
        tags: ['Fashion', 'Trendy'],
        paymentGateway: 'PayU',
        pgTransactionId: 'TXN001241',
        source: 'Mobile App',
        discountTotal: '100',
        discountName: 'First Order Discount'
    }
];

export const abandonedCarts = [
    {
        id: "CART-001",
        customer: "Alice Cooper",
        email: "alice@example.com",
        items: 2,
        total: 159.99,
        abandonedAt: "2024-01-15 14:30",
        lastActivity: "2 hours ago"
    },
    {
        id: "CART-002",
        customer: "Bob Wilson",
        email: "bob@example.com",
        items: 1,
        total: 89.99,
        abandonedAt: "2024-01-15 12:15",
        lastActivity: "4 hours ago"
    },
    {
        id: "CART-003",
        customer: "Carol Davis",
        email: "carol@example.com",
        items: 3,
        total: 299.99,
        abandonedAt: "2024-01-15 10:45",
        lastActivity: "6 hours ago"
    },
    {
        id: "CART-004",
        customer: "Eve Johnson",
        email: "eve@example.com",
        items: 1,
        total: 49.99,
        abandonedAt: "2024-01-14 16:20",
        lastActivity: "1 day ago"
    }
];

export const financeData = {
    currentBalance: 15420.50,
    monthlyRevenue: 284750,
    monthlyExpenses: 125430,
    pendingPayouts: 45680,
    transactions: [
        {
            id: "TXN-001",
            type: "Credit",
            amount: 299.99,
            description: "Order payment - ORD-001",
            date: "2024-01-15",
            status: "Completed"
        },
        {
            id: "TXN-002",
            type: "Debit",
            amount: -50.00,
            description: "Service fee",
            date: "2024-01-14",
            status: "Completed"
        },
        {
            id: "TXN-003",
            type: "Credit",
            amount: 149.50,
            description: "Order payment - ORD-002",
            date: "2024-01-14",
            status: "Completed"
        }
    ]
};

export const reportsData = {
    salesChart: [
        { month: "Jan", sales: 125000 },
        { month: "Feb", sales: 145000 },
        { month: "Mar", sales: 165000 },
        { month: "Apr", sales: 185000 },
        { month: "May", sales: 205000 },
        { month: "Jun", sales: 225000 }
    ],
    topProducts: [
        { name: "Product A", sales: 1250, revenue: 62500 },
        { name: "Product B", sales: 980, revenue: 49000 },
        { name: "Product C", sales: 750, revenue: 37500 },
        { name: "Product D", sales: 620, revenue: 31000 }
    ],
    customerStats: {
        totalCustomers: 1247,
        newCustomers: 89,
        repeatCustomers: 1158,
        avgCustomerValue: 228.5
    }
};

export const settingsData = {
    company: {
        name: "Checkout Admin",
        email: "admin@checkout.com",
        phone: "+91 98765 43210",
        address: "123 Business Street, Mumbai, India"
    },
    notifications: {
        email: true,
        sms: false,
        push: true
    },
    security: {
        twoFactorAuth: true,
        sessionTimeout: 30
    }
}; 