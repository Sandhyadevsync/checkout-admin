import { useState, useRef } from 'react';
import { Save, Building, Bell, Globe, Upload, X } from 'lucide-react';
import { settingsData } from '../../data/mockData';

const GeneralSettings = () => {
    const [settings, setSettings] = useState(settingsData);
    const [isSaving, setIsSaving] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [storeNameError, setStoreNameError] = useState('');
    const fileInputRef = useRef(null);

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

    const updateLinks = (field, value) => {
        setSettings(prev => ({
            ...prev,
            links: {
                ...prev.links,
                [field]: value
            }
        }));
    };

    const updateSetting = (field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
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

    return (
        <div className="space-y-6">
            {/* Header with Save Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your store information and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#F58220] hover:bg-[#E67300] text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                >
                    <Save size={16} />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Store Information</h2>
                    <p className="text-sm text-gray-600">Basic information about your store</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={settings.company.name}
                                onChange={(e) => updateCompanyInfo('name', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 ${storeNameError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                maxLength={29}
                                placeholder="Enter store name"
                            />
                        </div>
                        {storeNameError && (
                            <p className="text-red-500 text-xs mt-1">{storeNameError}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            Provided Store Name will be used in SMS/Whatsapp communications sent to customers for OTP validation & order confirmation (max 29 characters)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Logo
                        </label>
                        <div className="space-y-3">
                            {logoPreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={logoPreview}
                                        alt="Company Logo"
                                        className="w-20 h-20 object-contain border border-gray-200 rounded-lg bg-gray-50"
                                    />
                                    <button
                                        onClick={removeLogo}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-[#F58220] transition-colors">
                                    <Upload className="text-gray-400" size={24} />
                                </div>
                            )}
                            <div className="flex space-x-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-white border border-gray-300 hover:border-[#F58220] text-gray-700 hover:text-[#F58220] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                                >
                                    <Upload size={14} />
                                    <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                                </button>
                                {logoPreview && (
                                    <button
                                        onClick={removeLogo}
                                        className="bg-white border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <X size={14} />
                                        <span>Remove</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">
                                Recommended: Square image, max 5MB (PNG, JPG, SVG)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Policy Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Policy Links</h2>
                    <p className="text-sm text-gray-600">Add links to your store policies</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Policy</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                            placeholder="Enter Shipping Policy URL"
                            value={settings.links?.shippingPolicy || ''}
                            onChange={e => updateLinks('shippingPolicy', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Refund Policy</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                            placeholder="Enter Refund Policy URL"
                            value={settings.links?.refundPolicy || ''}
                            onChange={e => updateLinks('refundPolicy', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                            placeholder="Enter Privacy Policy URL"
                            value={settings.links?.privacyPolicy || ''}
                            onChange={e => updateLinks('privacyPolicy', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Terms of Service</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                            placeholder="Enter Terms of Service URL"
                            value={settings.links?.termsOfService || ''}
                            onChange={e => updateLinks('termsOfService', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Order Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Settings</h2>
                    <p className="text-sm text-gray-600">Configure order-related preferences</p>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F58220] rounded-lg flex items-center justify-center">
                            <Bell className="text-white" size={16} />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Send Order Confirmation</h4>
                            <p className="text-xs text-gray-600">Automatically send confirmation emails to customers</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.sendOrderConfirmation}
                            onChange={e => updateSetting('sendOrderConfirmation', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                    </label>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Advanced Settings</h2>
                    <p className="text-sm text-gray-600">Advanced configuration options</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Globe className="text-gray-600" size={16} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Enable Headless Mode</h4>
                                <p className="text-xs text-gray-600">Enable headless checkout functionality</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.enableHeadless}
                                onChange={e => updateSetting('enableHeadless', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F58220]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F58220]"></div>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company ID</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                                placeholder="Enter Company ID"
                                value={settings.companyId || ''}
                                onChange={e => updateSetting('companyId', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Onboard Version <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] transition-all duration-200 text-sm"
                                placeholder="Enter Onboard Version"
                                value={settings.onboardVersion || ''}
                                onChange={e => updateSetting('onboardVersion', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings; 