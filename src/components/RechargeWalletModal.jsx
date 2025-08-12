import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const RechargeWalletModal = ({ isOpen, onClose, currentBalance }) => {
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState('');
    const [showBankDetails, setShowBankDetails] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const predefinedAmounts = [200, 500, 1000, 2500, 5000];

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (value) => {
        setCustomAmount(value);
        setSelectedAmount(0);
    };

    const handleRecharge = () => {
        const finalAmount = selectedAmount || parseFloat(customAmount) || 0;
        if (finalAmount > 0) {
            // Here you would implement the actual recharge logic
            console.log('Recharging wallet with:', finalAmount);
            alert(`Recharge initiated for ₹${finalAmount.toLocaleString()}`);
            onClose();
        }
    };

    const finalAmount = selectedAmount || parseFloat(customAmount) || 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recharge your wallet</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Current Balance */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current wallet balance</span>
                        <span className="text-green-600 font-semibold">₹{currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Bank Details Link */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setShowBankDetails(!showBankDetails)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                        >
                            <span>Bank details - NEFT Payment</span>
                            {showBankDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    {/* Bank Details Dropdown */}
                    {showBankDetails && (
                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                            <div className="space-y-2">
                                <div><strong>Bank Name:</strong> HDFC Bank</div>
                                <div><strong>Account Number:</strong> 1234567890</div>
                                <div><strong>IFSC Code:</strong> HDFC0001234</div>
                                <div><strong>Account Holder:</strong> DevSync Checkout</div>
                            </div>
                        </div>
                    )}

                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Enter amount to recharge
                        </label>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:border-transparent"
                        />
                    </div>

                    {/* Predefined Amounts */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Or select amount from below
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            {predefinedAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handleAmountSelect(amount)}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${selectedAmount === amount
                                        ? 'bg-[#F58220] text-white border-[#F58220]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#F58220]'
                                        }`}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recharge Amount Display */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-200">
                        <span className="text-gray-600">Recharge Amount</span>
                        <span className="text-lg font-semibold text-gray-900">₹{finalAmount.toLocaleString()}</span>
                    </div>

                    {/* Recharge Button */}
                    <button
                        onClick={handleRecharge}
                        disabled={finalAmount <= 0}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${finalAmount > 0
                            ? 'bg-[#F58220] hover:bg-[#d6731a]'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        Recharge now
                    </button>

                    {/* Terms & Conditions */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowTerms(!showTerms)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1 mx-auto"
                        >
                            <span>Terms & Conditions</span>
                            {showTerms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    {/* Terms Dropdown */}
                    {showTerms && (
                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                            <div className="space-y-2">
                                <p>• Minimum recharge amount: ₹200</p>
                                <p>• Maximum recharge amount: ₹50,000</p>
                                <p>• Processing time: 2-4 hours</p>
                                <p>• Refunds processed within 5-7 business days</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RechargeWalletModal;
