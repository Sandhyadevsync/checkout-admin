import { Webhook } from 'lucide-react';

const WebhookSettings = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Webhooks</h1>
                    <p className="text-sm text-gray-600 mt-1">Configure webhook endpoints and event notifications</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Webhook Configuration</h2>
                    <p className="text-sm text-gray-600">Set up webhook endpoints for real-time event notifications</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-[#F58220] rounded-lg flex items-center justify-center">
                            <Webhook className="text-white" size={16} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">Order Events</h4>
                            <p className="text-xs text-gray-600">Configure webhooks for order status changes</p>
                        </div>
                        <button className="bg-[#F58220] hover:bg-[#E67300] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Configure
                        </button>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Webhook className="text-gray-600" size={16} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">Payment Events</h4>
                            <p className="text-xs text-gray-600">Set up webhooks for payment status updates</p>
                        </div>
                        <button className="bg-white border border-gray-300 hover:border-[#F58220] text-gray-700 hover:text-[#F58220] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Configure
                        </button>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Webhook className="text-gray-600" size={16} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">Custom Events</h4>
                            <p className="text-xs text-gray-600">Configure custom webhook events and endpoints</p>
                        </div>
                        <button className="bg-white border border-gray-300 hover:border-[#F58220] text-gray-700 hover:text-[#F58220] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Configure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebhookSettings; 