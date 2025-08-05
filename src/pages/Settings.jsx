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
    X
} from 'lucide-react';
import Card from '../components/Card';
import { settingsData } from '../data/mockData';

const Settings = () => {
    const [settings, setSettings] = useState(settingsData);
    const [isSaving, setIsSaving] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleSave = () => {
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

    return (
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
            <Card title="Company Information" subtitle="Update your business details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                        </label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={settings.company.name}
                                onChange={(e) => updateCompanyInfo('name', e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Logo
                        </label>
                        <div className="space-y-3">
                            {logoPreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={logoPreview}
                                        alt="Company Logo"
                                        className="w-20 h-20 object-contain border border-gray-300 rounded-lg"
                                    />
                                    <button
                                        onClick={removeLogo}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                    <Upload className="text-gray-400" size={24} />
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
                                    className="btn-secondary flex items-center space-x-2 text-sm"
                                >
                                    <Upload size={16} />
                                    <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                                </button>
                                {logoPreview && (
                                    <button
                                        onClick={removeLogo}
                                        className="btn-secondary flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
                                    >
                                        <X size={16} />
                                        <span>Remove</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">
                                Recommended: Square image, max 5MB (PNG, JPG, SVG)
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={settings.company.email}
                                onChange={(e) => updateCompanyInfo('email', e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                value={settings.company.phone}
                                onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={settings.company.address}
                                onChange={(e) => updateCompanyInfo('address', e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notification Settings */}
            <Card title="Notification Preferences" subtitle="Choose how you want to be notified">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Bell className="text-gray-600" size={20} />
                            <div>
                                <h4 className="font-medium text-gray-900">Email Notifications</h4>
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
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Phone className="text-gray-600" size={20} />
                            <div>
                                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
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
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Bell className="text-gray-600" size={20} />
                            <div>
                                <h4 className="font-medium text-gray-900">Push Notifications</h4>
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
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Security Settings */}
            <Card title="Security Settings" subtitle="Manage your account security">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Shield className="text-gray-600" size={20} />
                            <div>
                                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
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
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                            <User className="text-gray-600" size={20} />
                            <div>
                                <h4 className="font-medium text-gray-900">Session Timeout</h4>
                                <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                            </div>
                        </div>
                        <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => updateSecurity('sessionTimeout', parseInt(e.target.value))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Account Actions">
                    <div className="space-y-3">
                        <button className="w-full btn-secondary">Change Password</button>
                        <button className="w-full btn-secondary">Export Data</button>
                        <button className="w-full btn-secondary">Download Reports</button>
                    </div>
                </Card>

                <Card title="Danger Zone">
                    <div className="space-y-3">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            Deactivate Account
                        </button>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            Delete Account
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings; 