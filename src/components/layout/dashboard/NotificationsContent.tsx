import { Role } from "@/utils/context/interface/Auth";

interface NotificationsContentProps {
    role: Role;
    onClose: () => void;
}

export default function NotificationsContent({ role, onClose }: NotificationsContentProps) {
    return (
        <div className="notifications-popup absolute right-0 top-16 w-80 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <div
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            {/* Content berdasarkan role */}
            <div className="max-h-[400px] overflow-y-auto">
                {role === Role.SUPER_ADMIN && (
                    <div className="p-4">
                        <div className="space-y-4">
                            <NotificationItem
                                title="System Update"
                                message="New security patch available"
                                time="Just now"
                                type="critical"
                            />
                            <NotificationItem
                                title="Admin Activity"
                                message="New admin account created"
                                time="5m ago"
                                type="warning"
                            />
                            <NotificationItem
                                title="User Reports"
                                message="Monthly analytics ready"
                                time="1h ago"
                                type="info"
                            />
                        </div>
                    </div>
                )}

                {role === Role.ADMIN && (
                    <div className="p-4">
                        <div className="space-y-4">
                            <NotificationItem
                                title="User Management"
                                message="5 new user registrations"
                                time="10m ago"
                                type="info"
                            />
                            <NotificationItem
                                title="Content Update"
                                message="New content needs review"
                                time="30m ago"
                                type="warning"
                            />
                        </div>
                    </div>
                )}

                {role === Role.USER && (
                    <div className="p-4">
                        <div className="space-y-4">
                            <NotificationItem
                                title="Account Update"
                                message="Profile changes saved"
                                time="2h ago"
                                type="success"
                            />
                            <NotificationItem
                                title="System Notice"
                                message="Scheduled maintenance tonight"
                                time="5h ago"
                                type="info"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface NotificationItemProps {
    title: string;
    message: string;
    time: string;
    type: 'critical' | 'warning' | 'info' | 'success';
}

function NotificationItem({ title, message, time, type }: NotificationItemProps) {
    return (
        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
            {/* Icon berdasarkan type */}
            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${type === 'critical' ? 'bg-red-100 text-red-600' : ''}
                ${type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                ${type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                ${type === 'success' ? 'bg-green-100 text-green-600' : ''}
            `}>
                {type === 'critical' && <CriticalIcon />}
                {type === 'warning' && <WarningIcon />}
                {type === 'info' && <InfoIcon />}
                {type === 'success' && <SuccessIcon />}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{title}</h4>
                    <span className="text-xs text-slate-400">{time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{message}</p>
            </div>
        </div>
    );
}

// Icon components
function CriticalIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

function WarningIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function SuccessIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}