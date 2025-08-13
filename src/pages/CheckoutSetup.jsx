import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    Building2,
    Globe,
    Mail,
    CheckCircle,
    ArrowRight,
    Smartphone,
    ShoppingCart,
    CreditCard,
    Zap
} from 'lucide-react';

const CheckoutSetup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        websiteUrl: ''
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const store = location.state?.store;
    const isExisting = location.state?.isExisting;

    useEffect(() => {
        // Pre-fill email if available
        if (store?.email) {
            setFormData(prev => ({ ...prev, email: store.email }));
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Move to next step
            setCurrentStep(2);
        } catch (error) {
            console.error('Setup failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteSetup = () => {
        // Navigate to main dashboard
        navigate('/dashboard');
    };

    const steps = [
        {
            id: 1,
            title: 'Basic Information',
            description: 'Provide your store details to get started',
            icon: Building2
        },
        {
            id: 2,
            title: 'Setup Complete',
            description: 'Your checkout is ready to use',
            icon: CheckCircle
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Background Illustrations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Left side illustration */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-10">
                    <div className="relative w-full h-full">
                        <div className="absolute left-0 top-0 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
                        <div className="absolute left-20 top-20 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
                        <div className="absolute left-40 top-40 w-20 h-20 bg-green-200 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* Right side illustration */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-10">
                    <div className="relative w-full h-full">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200 rounded-full blur-xl"></div>
                        <div className="absolute right-20 top-20 w-24 h-24 bg-red-200 rounded-xl blur-xl"></div>
                        <div className="absolute right-40 top-40 w-20 h-20 bg-yellow-200 rounded-xl blur-xl"></div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6">
                    <Link to="/store-selection" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Store Selection
                    </Link>

                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                            <Building2 size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                            <p className="text-sm text-gray-600">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${currentStep >= step.id
                                    ? 'bg-orange-500 border-orange-500 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    <step.icon size={20} />
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-2xl">
                        {currentStep === 1 ? (
                            /* Step 1: Basic Information */
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                        <Building2 size={32} className="text-orange-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {isExisting ? `Setup ${store?.name}` : 'Setup New Store'}
                                    </h2>
                                    <p className="text-gray-600">
                                        {isExisting
                                            ? `Complete the setup for ${store?.name} to start using our checkout solution`
                                            : 'Provide your store details to get started with our powerful checkout solution'
                                        }
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email ID *
                                        </label>
                                        <div className="relative">
                                            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                                placeholder="Enter your email address"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                            Website URL *
                                        </label>
                                        <div className="relative">
                                            <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="url"
                                                id="websiteUrl"
                                                value={formData.websiteUrl}
                                                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                                placeholder="Enter your website URL"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Setting up...
                                            </div>
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </form>

                                {/* Features Preview */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">
                                        What you'll get:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-green-500 mr-2" />
                                            Mobile-optimized checkout
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-green-500 mr-2" />
                                            Payment gateway integration
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-green-500 mr-2" />
                                            Analytics dashboard
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle size={16} className="text-green-500 mr-2" />
                                            24/7 support
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Step 2: Setup Complete */
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle size={40} className="text-green-600" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    You're just one step away from experiencing 1-click checkout!
                                </h2>

                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    Your checkout setup is complete. You can now start managing your store and processing orders through our powerful dashboard.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <Smartphone size={24} className="text-blue-600 mx-auto mb-2" />
                                        <h4 className="font-medium text-gray-900">Mobile Ready</h4>
                                        <p className="text-sm text-gray-600">Optimized for all devices</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <ShoppingCart size={24} className="text-green-600 mx-auto mb-2" />
                                        <h4 className="font-medium text-gray-900">Easy Checkout</h4>
                                        <p className="text-sm text-gray-600">Streamlined process</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <CreditCard size={24} className="text-purple-600 mx-auto mb-2" />
                                        <h4 className="font-medium text-gray-900">Secure Payments</h4>
                                        <p className="text-sm text-gray-600">Multiple payment options</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCompleteSetup}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                                >
                                    <span>Go to Dashboard</span>
                                    <ArrowRight size={20} className="ml-2" />
                                </button>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-500">
                                        Need help? Contact our support team at{' '}
                                        <a href="mailto:support@checkout.com" className="text-orange-600 hover:text-orange-700">
                                            support@checkout.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSetup;
