// Mock data for the admin panel

export const dashboardStats = {
    totalOrders: 1247,
    totalRevenue: 284750,
    abandonedCarts: 89,
    conversionRate: 12.5,
    avgOrderValue: 228.5,
    monthlyGrowth: 8.2
};

export const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        email: "john@example.com",
        amount: 299.99,
        status: "Delivered",
        date: "2024-01-15",
        items: 3
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        email: "jane@example.com",
        amount: 149.50,
        status: "Processing",
        date: "2024-01-14",
        items: 2
    },
    {
        id: "ORD-003",
        customer: "Mike Johnson",
        email: "mike@example.com",
        amount: 599.99,
        status: "Shipped",
        date: "2024-01-13",
        items: 1
    },
    {
        id: "ORD-004",
        customer: "Sarah Wilson",
        email: "sarah@example.com",
        amount: 89.99,
        status: "Pending",
        date: "2024-01-12",
        items: 4
    },
    {
        id: "ORD-005",
        customer: "David Brown",
        email: "david@example.com",
        amount: 199.99,
        status: "Delivered",
        date: "2024-01-11",
        items: 2
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