import { useState } from 'react';
import { Truck, Plus, Edit, Trash2, MapPin, Clock, Package, Save, Search, Globe, Settings, Upload, Download } from 'lucide-react';

const ShippingSettings = () => {
    const [activeTab, setActiveTab] = useState('default');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Form states for different sections
    const [prepaidDiscount, setPrepaidDiscount] = useState({
        amount: 0,
        percentage: 0,
        applyMaxValue: 'yes'
    });

    const [codToPrepaidDiscount, setCodToPrepaidDiscount] = useState({
        amount: 0,
        percentage: 0,
        applyMaxValue: 'yes',
        enableCodToPrepaid: 'no',
        additionalValue: 300
    });

    const [codCharges, setCodCharges] = useState({
        amount: 0,
        percentage: 0,
        applyMaxValue: 'no'
    });

    const [pickupConfig, setPickupConfig] = useState({
        cutOffTime: '18:28',
        tatAfterCutOff: 1,
        tatBeforeCutOff: 1
    });

    const [nonServiceablePincodes, setNonServiceablePincodes] = useState({
        selection: 'include',
        pincodes: '',
        csvFile: null
    });

    const [zoneTatTable, setZoneTatTable] = useState([
        { zone: 'Zone A', fastTat: 1, noRushTat: 2 },
        { zone: 'Zone B', fastTat: 2, noRushTat: 3 },
        { zone: 'Zone C', fastTat: 2, noRushTat: 4 },
        { zone: 'Zone D', fastTat: 4, noRushTat: 6 },
        { zone: 'Zone E', fastTat: 5, noRushTat: 8 }
    ]);

    const handleInputChange = (section, field, value) => {
        switch (section) {
            case 'prepaidDiscount':
                setPrepaidDiscount(prev => ({ ...prev, [field]: value }));
                break;
            case 'codToPrepaidDiscount':
                setCodToPrepaidDiscount(prev => ({ ...prev, [field]: value }));
                break;
            case 'codCharges':
                setCodCharges(prev => ({ ...prev, [field]: value }));
                break;
            case 'pickupConfig':
                setPickupConfig(prev => ({ ...prev, [field]: value }));
                break;
            case 'nonServiceablePincodes':
                setNonServiceablePincodes(prev => ({ ...prev, [field]: value }));
                break;
            default:
                break;
        }
    };

    const handleZoneTatChange = (index, field, value) => {
        const updatedTable = [...zoneTatTable];
        updatedTable[index] = { ...updatedTable[index], [field]: value };
        setZoneTatTable(updatedTable);
    };

    const handleSave = () => {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2000);
    };

    const handleResetPincodes = () => {
        setNonServiceablePincodes(prev => ({ ...prev, pincodes: '' }));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNonServiceablePincodes(prev => ({ ...prev, csvFile: file }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shipping</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('default')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'default'
                                ? 'border-[#F58220] text-[#F58220]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        DEFAULT VALUE
                    </button>
                    <button
                        onClick={() => setActiveTab('custom')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'custom'
                                ? 'border-[#F58220] text-[#F58220]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        CUSTOM RULES
                    </button>
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'default' && (
                <div className="space-y-8">
                    {/* Prepaid Discount Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Prepaid Discount</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            value={prepaidDiscount.amount}
                                            onChange={(e) => handleInputChange('prepaidDiscount', 'amount', e.target.value)}
                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <span className="text-gray-900 font-medium">or</span>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                                    <div className="relative">
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                                        <input
                                            type="number"
                                            value={prepaidDiscount.percentage}
                                            onChange={(e) => handleInputChange('prepaidDiscount', 'percentage', e.target.value)}
                                            className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">* Apply maximum value</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="yes"
                                            checked={prepaidDiscount.applyMaxValue === 'yes'}
                                            onChange={(e) => handleInputChange('prepaidDiscount', 'applyMaxValue', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="no"
                                            checked={prepaidDiscount.applyMaxValue === 'no'}
                                            onChange={(e) => handleInputChange('prepaidDiscount', 'applyMaxValue', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COD to Prepaid Discount Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Cod to Prepaid Discount</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            value={codToPrepaidDiscount.amount}
                                            onChange={(e) => handleInputChange('codToPrepaidDiscount', 'amount', e.target.value)}
                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <span className="text-gray-900 font-medium">or</span>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                                    <div className="relative">
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                                        <input
                                            type="number"
                                            value={codToPrepaidDiscount.percentage}
                                            onChange={(e) => handleInputChange('codToPrepaidDiscount', 'percentage', e.target.value)}
                                            className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Value</label>
                                <input
                                    type="number"
                                    value={codToPrepaidDiscount.additionalValue}
                                    onChange={(e) => handleInputChange('codToPrepaidDiscount', 'additionalValue', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                    placeholder="300"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Apply maximum value</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="yes"
                                                checked={codToPrepaidDiscount.applyMaxValue === 'yes'}
                                                onChange={(e) => handleInputChange('codToPrepaidDiscount', 'applyMaxValue', e.target.value)}
                                                className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                            />
                                            <span className="text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="no"
                                                checked={codToPrepaidDiscount.applyMaxValue === 'no'}
                                                onChange={(e) => handleInputChange('codToPrepaidDiscount', 'applyMaxValue', e.target.value)}
                                                className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                            />
                                            <span className="text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Enable Cod to Prepaid</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="yes"
                                                checked={codToPrepaidDiscount.enableCodToPrepaid === 'yes'}
                                                onChange={(e) => handleInputChange('codToPrepaidDiscount', 'enableCodToPrepaid', e.target.value)}
                                                className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                            />
                                            <span className="text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="no"
                                                checked={codToPrepaidDiscount.enableCodToPrepaid === 'no'}
                                                onChange={(e) => handleInputChange('codToPrepaidDiscount', 'enableCodToPrepaid', e.target.value)}
                                                className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                            />
                                            <span className="text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COD Charges Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">COD Charges</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            value={codCharges.amount}
                                            onChange={(e) => handleInputChange('codCharges', 'amount', e.target.value)}
                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <span className="text-gray-900 font-medium">or</span>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                                    <div className="relative">
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                                        <input
                                            type="number"
                                            value={codCharges.percentage}
                                            onChange={(e) => handleInputChange('codCharges', 'percentage', e.target.value)}
                                            className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">* Apply maximum value</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="yes"
                                            checked={codCharges.applyMaxValue === 'yes'}
                                            onChange={(e) => handleInputChange('codCharges', 'applyMaxValue', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="no"
                                            checked={codCharges.applyMaxValue === 'no'}
                                            onChange={(e) => handleInputChange('codCharges', 'applyMaxValue', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pickup Configuration Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Pickup Configuration</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">* Cut-off time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={pickupConfig.cutOffTime}
                                        onChange={(e) => handleInputChange('pickupConfig', 'cutOffTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                    />
                                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">* TAT after cut-off time</label>
                                <input
                                    type="number"
                                    value={pickupConfig.tatAfterCutOff}
                                    onChange={(e) => handleInputChange('pickupConfig', 'tatAfterCutOff', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                    placeholder="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">* TAT before cut-off time</label>
                                <input
                                    type="number"
                                    value={pickupConfig.tatBeforeCutOff}
                                    onChange={(e) => handleInputChange('pickupConfig', 'tatBeforeCutOff', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                    placeholder="1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Non Serviceable Pincodes Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Non Serviceable Pincodes</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Selection</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="include"
                                            checked={nonServiceablePincodes.selection === 'include'}
                                            onChange={(e) => handleInputChange('nonServiceablePincodes', 'selection', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">Include</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="exclude"
                                            checked={nonServiceablePincodes.selection === 'exclude'}
                                            onChange={(e) => handleInputChange('nonServiceablePincodes', 'selection', e.target.value)}
                                            className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                        />
                                        <span className="text-sm text-gray-700">Exclude</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-bold text-gray-900">Select Pincodes</label>
                                    <button
                                        onClick={handleResetPincodes}
                                        className="text-[#F58220] hover:text-[#E67300] text-sm font-medium"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <textarea
                                    value={nonServiceablePincodes.pincodes}
                                    onChange={(e) => handleInputChange('nonServiceablePincodes', 'pincodes', e.target.value)}
                                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] resize-none"
                                    placeholder="Add comma separated pincode list"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">or upload pincode list</label>
                                <div className="flex items-center space-x-4">
                                    <label className="bg-[#F58220] hover:bg-[#E67300] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2">
                                        <Upload size={16} />
                                        <span>Upload CSV</span>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <button className="text-[#F58220] hover:text-[#E67300] flex items-center space-x-2">
                                        <Download size={16} />
                                        <span>Download Sample CSV File</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zone TAT Table Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Zone TAT Table</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Zone</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Zone FAST TAT</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Zone No Rush TAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {zoneTatTable.map((zone, index) => (
                                        <tr key={index} className="border border-gray-200">
                                            <td className="border border-gray-200 px-4 py-2">{zone.zone}</td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={zone.fastTat}
                                                    onChange={(e) => handleZoneTatChange(index, 'fastTat', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                                />
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={zone.noRushTat}
                                                    onChange={(e) => handleZoneTatChange(index, 'noRushTat', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-[#F58220] hover:bg-[#E67300] text-white px-6 py-2 rounded-lg font-medium"
                            >
                                SAVE & PROCEED
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'custom' && (
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Settings size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Rules</h3>
                            <p className="text-sm text-gray-600">Configure custom shipping rules and conditions.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Shipping settings saved successfully!
                        </h3>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-6 py-2.5 border-2 border-[#F58220] text-[#F58220] rounded-lg hover:bg-orange-50 font-medium text-sm transition-colors"
                            >
                                Done
                            </button>
                        </div>
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
        </div>
    );
};

export default ShippingSettings; 