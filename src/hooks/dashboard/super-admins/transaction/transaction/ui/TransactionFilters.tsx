import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface TransactionFiltersProps {
    transactionSearchQuery: string;
    selectedStatus: string;
    selectedDate: Date | null;
    onSearchChange: (query: string) => void;
    onStatusChange: (status: string) => void;
    onDateChange: (date: Date | null) => void;
}

export function TransactionFilters({
    transactionSearchQuery,
    selectedStatus,
    selectedDate,
    onSearchChange,
    onStatusChange,
    onDateChange
}: TransactionFiltersProps) {
    const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
        <div className="relative cursor-pointer" onClick={onClick}>
            <input
                type="text"
                readOnly
                value={value || ''}
                placeholder="Select date..."
                className="w-full px-4 py-3.5 pl-11 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 cursor-pointer"
            />
            <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            {selectedDate && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDateChange(null);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={transactionSearchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                />
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <select
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full px-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-gray-700 cursor-pointer"
            >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
            </select>

            <div className="relative">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => onDateChange(date)}
                    customInput={<CustomInput />}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    placeholderText="Select date..."
                    className="w-full"
                    wrapperClassName="w-full"
                    calendarClassName="shadow-xl border-0"
                    showPopperArrow={false}
                />
            </div>

            <style jsx global>{`
                .react-datepicker {
                    font-family: inherit;
                    border-radius: 0.75rem;
                    border: 1px solid #e5e7eb;
                    background-color: white;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .react-datepicker__header {
                    background-color: #f9fafb;
                    border-bottom: 1px solid #e5e7eb;
                    padding: 1rem;
                }
                .react-datepicker__current-month {
                    font-weight: 600;
                    font-size: 1rem;
                    color: #111827;
                }
                .react-datepicker__day-name {
                    color: #6b7280;
                    font-weight: 500;
                }
                .react-datepicker__day {
                    color: #374151;
                    border-radius: 0.375rem;
                    margin: 0.2rem;
                    width: 2rem;
                    line-height: 2rem;
                }
                .react-datepicker__day:hover {
                    background-color: #f3f4f6;
                }
                .react-datepicker__day--selected {
                    background-color: #2563eb !important;
                    color: white !important;
                }
                .react-datepicker__day--keyboard-selected {
                    background-color: #2563eb !important;
                    color: white !important;
                }
                .react-datepicker__navigation {
                    top: 1rem;
                }
                .react-datepicker__navigation-icon::before {
                    border-color: #6b7280;
                }
                .react-datepicker__day--outside-month {
                    color: #9ca3af;
                }
            `}</style>
        </div>
    );
}