import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BrandContext = createContext();

export const useBrand = () => {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error('useBrand must be used within a BrandProvider');
    }
    return context;
};

export const BrandProvider = ({ children }) => {
    const [currentBrand, setCurrentBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userPermissions, setUserPermissions] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Mock brands data - in real app, this would come from API
    const mockBrands = [
        {
            id: 'brand-1',
            name: 'Electronics Store',
            domain: 'electronics.example.com',
            logo: '/logos/electronics-logo.png',
            theme: {
                primaryColor: '#F58220',
                secondaryColor: '#000000',
                accentColor: '#FF6B35'
            },
            settings: {
                currency: 'USD',
                timezone: 'America/New_York',
                language: 'en'
            },
            status: 'active',
            subscription: {
                plan: 'pro',
                status: 'active',
                expiresAt: '2025-12-31'
            }
        },
        {
            id: 'brand-2',
            name: 'Fashion Boutique',
            domain: 'fashion.example.com',
            logo: '/logos/fashion-logo.png',
            theme: {
                primaryColor: '#FF69B4',
                secondaryColor: '#2C3E50',
                accentColor: '#E74C3C'
            },
            settings: {
                currency: 'EUR',
                timezone: 'Europe/London',
                language: 'en'
            },
            status: 'active',
            subscription: {
                plan: 'basic',
                status: 'active',
                expiresAt: '2025-12-31'
            }
        },
        {
            id: 'brand-3',
            name: 'Home & Garden',
            domain: 'home.example.com',
            logo: '/logos/home-logo.png',
            theme: {
                primaryColor: '#27AE60',
                secondaryColor: '#34495E',
                accentColor: '#F39C12'
            },
            settings: {
                currency: 'GBP',
                timezone: 'Europe/London',
                language: 'en'
            },
            status: 'trial',
            subscription: {
                plan: 'trial',
                status: 'trial',
                expiresAt: '2025-01-31'
            }
        }
    ];

    // Initialize brands
    useEffect(() => {
        const initializeBrands = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setBrands(mockBrands);

                // Set default brand or restore from localStorage
                const savedBrandId = localStorage.getItem('currentBrandId');
                if (savedBrandId) {
                    const brand = mockBrands.find(b => b.id === savedBrandId);
                    if (brand) {
                        setCurrentBrand(brand);
                    }
                } else if (mockBrands.length > 0) {
                    setCurrentBrand(mockBrands[0]);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Failed to initialize brands:', error);
                setIsLoading(false);
            }
        };

        initializeBrands();
    }, []);

    // Switch brand
    const switchBrand = async (brandId) => {
        try {
            const brand = brands.find(b => b.id === brandId);
            if (brand) {
                setCurrentBrand(brand);
                localStorage.setItem('currentBrandId', brandId);

                // Update user permissions based on brand
                updateUserPermissions(brand);

                // Navigate to dashboard or current page
                if (location.pathname === '/') {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Failed to switch brand:', error);
        }
    };

    // Update user permissions based on brand
    const updateUserPermissions = (brand) => {
        // Mock permissions - in real app, this would come from API
        const permissions = {
            canManageOrders: true,
            canManageFinance: brand.subscription.plan !== 'basic',
            canManageUsers: brand.subscription.plan === 'pro',
            canManageSettings: true,
            canViewReports: brand.subscription.plan !== 'basic',
            canExportData: brand.subscription.plan === 'pro',
            canManageBrands: false, // Only super admin can manage brands
        };
        setUserPermissions(permissions);
    };

    // Create new brand
    const createBrand = async (brandData) => {
        try {
            const newBrand = {
                id: `brand-${Date.now()}`,
                ...brandData,
                status: 'active',
                subscription: {
                    plan: 'trial',
                    status: 'trial',
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }
            };

            setBrands(prev => [...prev, newBrand]);
            return newBrand;
        } catch (error) {
            console.error('Failed to create brand:', error);
            throw error;
        }
    };

    // Update brand
    const updateBrand = async (brandId, updates) => {
        try {
            setBrands(prev => prev.map(brand =>
                brand.id === brandId ? { ...brand, ...updates } : brand
            ));

            if (currentBrand?.id === brandId) {
                setCurrentBrand(prev => ({ ...prev, ...updates }));
            }
        } catch (error) {
            console.error('Failed to update brand:', error);
            throw error;
        }
    };

    // Delete brand
    const deleteBrand = async (brandId) => {
        try {
            setBrands(prev => prev.filter(brand => brand.id !== brandId));

            if (currentBrand?.id === brandId) {
                const remainingBrands = brands.filter(brand => brand.id !== brandId);
                if (remainingBrands.length > 0) {
                    setCurrentBrand(remainingBrands[0]);
                } else {
                    setCurrentBrand(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete brand:', error);
            throw error;
        }
    };

    // Get brand-specific data
    const getBrandData = (dataType) => {
        if (!currentBrand) return null;

        // In real app, this would fetch data specific to the current brand
        return {
            brandId: currentBrand.id,
            brandName: currentBrand.name,
            data: [] // Brand-specific data would be fetched here
        };
    };

    const value = {
        currentBrand,
        brands,
        isLoading,
        userPermissions,
        switchBrand,
        createBrand,
        updateBrand,
        deleteBrand,
        getBrandData
    };

    return (
        <BrandContext.Provider value={value}>
            {children}
        </BrandContext.Provider>
    );
};
