import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const DateRangePickerDemo = () => {
    const [basicDates, setBasicDates] = useState({ start: null, end: null });
    const [customDates, setCustomDates] = useState({ start: null, end: null });
    const [disabledDates, setDisabledDates] = useState({ start: null, end: null });
    const [minMaxDates, setMinMaxDates] = useState({ start: null, end: null });

    const handleBasicChange = (start, end) => {
        setBasicDates({ start, end });
        console.log('Basic DateRangePicker:', { start, end });
    };

    const handleCustomChange = (start, end) => {
        setCustomDates({ start, end });
        console.log('Custom DateRangePicker:', { start, end });
    };

    const handleDisabledChange = (start, end) => {
        setDisabledDates({ start, end });
        console.log('Disabled DateRangePicker:', { start, end });
    };

    const handleMinMaxChange = (start, end) => {
        setMinMaxDates({ start, end });
        console.log('MinMax DateRangePicker:', { start, end });
    };

    return (
        <div className="p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">DateRangePicker Component</h1>
                <p className="text-gray-600">A beautiful, reusable date range picker component</p>
            </div>

            {/* Basic Usage */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Usage</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <DateRangePicker
                        startDate={basicDates.start}
                        endDate={basicDates.end}
                        onDateRangeChange={handleBasicChange}
                        placeholder="Select date range"
                        className="w-full"
                    />
                    <div className="mt-4 text-sm text-gray-600">
                        <strong>Selected:</strong> {basicDates.start ? basicDates.start.toLocaleDateString() : 'None'} → {basicDates.end ? basicDates.end.toLocaleDateString() : 'None'}
                    </div>
                </div>
            </div>

            {/* Custom Styling */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Styling</h2>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl shadow-sm border border-orange-200">
                    <DateRangePicker
                        startDate={customDates.start}
                        endDate={customDates.end}
                        onDateRangeChange={handleCustomChange}
                        placeholder="Custom styled picker"
                        className="w-full"
                    />
                    <div className="mt-4 text-sm text-orange-700">
                        <strong>Selected:</strong> {customDates.start ? customDates.start.toLocaleDateString() : 'None'} → {customDates.end ? customDates.end.toLocaleDateString() : 'None'}
                    </div>
                </div>
            </div>

            {/* Disabled State */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Disabled State</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <DateRangePicker
                        startDate={disabledDates.start}
                        endDate={disabledDates.end}
                        onDateRangeChange={handleDisabledChange}
                        placeholder="This picker is disabled"
                        className="w-full"
                        disabled={true}
                    />
                    <div className="mt-4 text-sm text-gray-500">
                        This picker is disabled and cannot be interacted with
                    </div>
                </div>
            </div>

            {/* Min/Max Date Constraints */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Date Constraints</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <DateRangePicker
                        startDate={minMaxDates.start}
                        endDate={minMaxDates.end}
                        onDateRangeChange={handleMinMaxChange}
                        placeholder="Select dates within constraints"
                        className="w-full"
                        minDate={new Date('2025-01-01')}
                        maxDate={new Date('2025-12-31')}
                    />
                    <div className="mt-4 text-sm text-gray-600">
                        <strong>Selected:</strong> {minMaxDates.start ? minMaxDates.start.toLocaleDateString() : 'None'} → {minMaxDates.end ? minMaxDates.end.toLocaleDateString() : 'None'}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Only dates between Jan 1, 2025 and Dec 31, 2025 are selectable
                    </div>
                </div>
            </div>

            {/* Features List */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">🎨 Beautiful Design</h3>
                        <p className="text-sm text-gray-600">Modern, clean interface with smooth animations and hover effects</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">📅 Two Month View</h3>
                        <p className="text-sm text-gray-600">See two months at once for easier date range selection</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">⚡ Quick Selection</h3>
                        <p className="text-sm text-gray-600">Predefined ranges like Today, Last 7 Days, This Month</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">🔧 Fully Customizable</h3>
                        <p className="text-sm text-gray-600">Props for styling, constraints, and behavior customization</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">♿ Accessible</h3>
                        <p className="text-sm text-gray-600">Keyboard navigation, screen reader support, focus management</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">📱 Responsive</h3>
                        <p className="text-sm text-gray-600">Works perfectly on all device sizes and screen resolutions</p>
                    </div>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">How to Use</h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                        {`import DateRangePicker from './components/DateRangePicker';

const MyComponent = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateRangeChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        // Handle your date range logic here
    };

    return (
        <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={handleDateRangeChange}
            placeholder="Select date range"
            className="w-80"
            minDate={new Date('2025-01-01')}
            maxDate={new Date('2025-12-31')}
            showQuickSelect={true}
            showClear={true}
        />
    );
};`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DateRangePickerDemo;
