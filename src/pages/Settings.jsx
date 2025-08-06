import { useState, useRef } from 'react';
import {
    Save,
    Building,
    Bell,
    Shield,
    User,
    Mail,
    Phone,
    MapPin,
    Upload,
    X,
    ChevronUp,
    ChevronDown,
    Percent,
    Truck,
    CreditCard,
    Package,
    Globe,
    MapPin as MapPinIcon,
    Webhook,
    Gift
} from 'lucide-react';
import Card from '../components/Card';
import { settingsData } from '../data/mockData';

const Settings = () => {
    const [settings, setSettings] = useState(settingsData);
    const [isSaving, setIsSaving] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [activeSection, setActiveSection] = useState('general');
    const [storeNameError, setStoreNameError] = useState('');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const fileInputRef = useRef(null);

    const settingsSections = [
        { id: 'general', name: 'General Settings', icon: Building },
        { id: 'discounts', name: 'Discounts', icon: Percent },
        { id: 'shipping', name: 'Shipping Settings', icon: Truck },
        { id: 'payment', name: 'Payment', icon: CreditCard },
        { id: 'inventory', name: 'Inventory', icon: Package },
        { id: 'platform', name: 'Platform', icon: Globe },
        { id: 'tracking', name: 'Tracking Info', icon: MapPinIcon },
        { id: 'webhooks', name: 'Webhooks', icon: Webhook },
        { id: 'rewards', name: 'Rewards & Loyalty', icon: Gift }
    ];

    const handleSave = () => {
        // Validate before saving
        if (!settings.company.name.trim()) {
            setStoreNameError('Store name is required');
            return;
        }
        if (settings.company.name.length > 29) {
            setStoreNameError('Store name must be 29 characters or less');
            return;
        }

        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    const updateCompanyInfo = (field, value) => {
        setSettings(prev => ({
            ...prev,
            company: {
                ...prev.company,
                [field]: value
            }
        }));

        // Validate store name
        if (field === 'name') {
            if (!value.trim()) {
                setStoreNameError('Store name is required');
            } else if (value.length > 29) {
                setStoreNameError('Store name must be 29 characters or less');
            } else {
                setStoreNameError('');
            }
        }
    };

    const updateNotification = (type, value) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: value
            }
        }));
    };

    const updateSecurity = (field, value) => {
        setSettings(prev => ({
            ...prev,
            security: {
                ...prev.security,
                [field]: value
            }
        }));
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Save size={16} />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {/* Company Information */}
            <Card >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            Store Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={settings.company.name}
                                onChange={(e) => updateCompanyInfo('name', e.target.value)}
                                className={`input-field pl-9 w-full ${storeNameError ? 'border-red-500 focus:ring-red-500' : ''}`}
                                maxLength={29}
                            />
                        </div>
                        {storeNameError && (
                            <p className="text-red-500 text-xs mt-1">{storeNameError}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                            Provided Store Name will be used in SMS/Whatsapp communications sent to customers for OTP validation & order confirmation (max 29 characters)
                        </p>
                    </div>

                    <div>
                        <label className="label">
                            Logo
                        </label>
                        <div className="space-y-2.5">
                            {logoPreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={logoPreview}
                                        alt="Company Logo"
                                        className="w-16 h-16 object-contain border border-gray-200 rounded-lg"
                                    />
                                    <button
                                        onClick={removeLogo}
                                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                    >
                                        <X size={10} />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-16 h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                                    <Upload className="text-gray-400" size={20} />
                                </div>
                            )}
                            <div className="flex space-x-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-secondary flex items-center space-x-1.5"
                                >
                                    <Upload size={14} />
                                    <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                                </button>
                                {logoPreview && (
                                    <button
                                        onClick={removeLogo}
                                        className="btn-secondary flex items-center space-x-1.5 text-red-600 hover:text-red-700"
                                    >
                                        <X size={14} />
                                        <span>Remove</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">
                                Recommended: Square image, max 5MB (PNG, JPG, SVG)
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="email"
                                value={settings.company.email}
                                onChange={(e) => updateCompanyInfo('email', e.target.value)}
                                className="input-field pl-9 w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="tel"
                                value={settings.company.phone}
                                onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                                className="input-field pl-9 w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            Address
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={settings.company.address}
                                onChange={(e) => updateCompanyInfo('address', e.target.value)}
                                className="input-field pl-9 w-full"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notification Settings */}
            <Card title="Notification Preferences" subtitle="Choose how you want to be notified">
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2.5">
                            <Bell className="text-gray-600" size={16} />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                                <p className="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.email}
                                onChange={(e) => updateNotification('email', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2.5">
                            <Phone className="text-gray-600" size={16} />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                                <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.sms}
                                onChange={(e) => updateNotification('sms', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2.5">
                            <Bell className="text-gray-600" size={16} />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                                <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.push}
                                onChange={(e) => updateNotification('push', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Security Settings */}
            <Card title="Security Settings" subtitle="Manage your account security">
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2.5">
                            <Shield className="text-gray-600" size={16} />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.security.twoFactorAuth}
                                onChange={(e) => updateSecurity('twoFactorAuth', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2.5 mb-2">
                            <User className="text-gray-600" size={16} />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                                <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                            </div>
                        </div>
                        <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => updateSecurity('sessionTimeout', parseInt(e.target.value))}
                            className="input-field text-sm"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={0}>Never</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Account Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card title="Account Actions">
                    <div className="space-y-2.5">
                        <button className="w-full btn-secondary">Change Password</button>
                        <button className="w-full btn-secondary">Export Data</button>
                        <button className="w-full btn-secondary">Download Reports</button>
                    </div>
                </Card>

                <Card title="Danger Zone">
                    <div className="space-y-2.5">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            Deactivate Account
                        </button>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            Delete Account
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return renderGeneralSettings();
            case 'discounts':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Discounts</h2>
                        <Card title="Discount Settings">
                            <p className="text-[#333333]">Discount configuration options will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'shipping':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Shipping Settings</h2>
                        <Card title="Shipping Configuration">
                            <p className="text-[#333333]">Shipping settings and options will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'payment':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Payment Settings</h2>
                        <Card title="Payment Configuration">
                            <p className="text-[#333333]">Payment gateway settings will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'inventory':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Inventory Management</h2>
                        <Card title="Inventory Settings">
                            <p className="text-[#333333]">Inventory management options will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'platform':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Platform Settings</h2>
                        <Card title="Platform Configuration">
                            <p className="text-[#333333]">Platform integration settings will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'tracking':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Tracking Information</h2>
                        <Card title="Tracking Settings">
                            <p className="text-[#333333]">Tracking configuration options will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'webhooks':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Webhooks</h2>
                        <Card title="Webhook Configuration">
                            <p className="text-[#333333]">Webhook settings and endpoints will be displayed here.</p>
                        </Card>
                    </div>
                );
            case 'rewards':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#000000]">Rewards & Loyalty</h2>
                        <Card title="Loyalty Program Settings">
                            <p className="text-[#333333]">Rewards and loyalty program configuration will be displayed here.</p>
                        </Card>
                    </div>
                );
            default:
                return renderGeneralSettings();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            {/* Settings Sidebar */}
            <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-[#D3D3D3] p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#000000]">Settings</h2>
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isSidebarCollapsed ? (
                            <ChevronDown size={16} className="text-[#333333]" />
                        ) : (
                            <ChevronUp size={16} className="text-[#333333]" />
                        )}
                    </button>
                    <div className="hidden lg:block">
                        <ChevronUp size={16} className="text-[#333333]" />
                    </div>
                </div>

                <nav className={`space-y-1 transition-all duration-300 ${isSidebarCollapsed ? 'hidden lg:block' : 'block'}`}>
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    // Auto-collapse on mobile after selection
                                    if (window.innerWidth < 1024) {
                                        setIsSidebarCollapsed(true);
                                    }
                                }}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${activeSection === section.id
                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-[#333333] hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={16} />
                                <span className="text-sm font-medium">{section.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings; 