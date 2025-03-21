import { Role } from "@/utils/context/interface/Auth";

interface MessagesContentProps {
    role: Role;
    onClose: () => void;
}

export default function MessagesContent({ role, onClose }: MessagesContentProps) {
    return (
        <div className="messages-popup absolute right-0 top-16 w-80 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-semibold">Messages</h3>
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
                            <MessageItem
                                title="System Alert"
                                message="New admin registration request"
                                time="5m ago"
                                type="admin"
                            />
                            <MessageItem
                                title="User Support"
                                message="Need help with settings"
                                time="10m ago"
                                type="user"
                            />
                            <MessageItem
                                title="System Update"
                                message="Database maintenance scheduled"
                                time="1h ago"
                                type="system"
                            />
                        </div>
                    </div>
                )}

                {role === Role.ADMIN && (
                    <div className="p-4">
                        <div className="space-y-4">
                            <MessageItem
                                title="User Request"
                                message="Password reset assistance needed"
                                time="15m ago"
                                type="user"
                            />
                            <MessageItem
                                title="Admin Notice"
                                message="Weekly report ready"
                                time="30m ago"
                                type="admin"
                            />
                        </div>
                    </div>
                )}

                {role === Role.USER && (
                    <div className="p-4">
                        <div className="space-y-4">
                            <MessageItem
                                title="Support"
                                message="How can we help you today?"
                                time="1h ago"
                                type="support"
                            />
                            <MessageItem
                                title="System"
                                message="Your account has been updated"
                                time="2h ago"
                                type="system"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface MessageItemProps {
    title: string;
    message: string;
    time: string;
    type: 'admin' | 'user' | 'system' | 'support';
}

function MessageItem({ title, message, time, type }: MessageItemProps) {
    return (
        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
            {/* Icon berdasarkan type */}
            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${type === 'admin' ? 'bg-yellow-100 text-yellow-600' : ''}
                ${type === 'user' ? 'bg-blue-100 text-blue-600' : ''}
                ${type === 'system' ? 'bg-purple-100 text-purple-600' : ''}
                ${type === 'support' ? 'bg-green-100 text-green-600' : ''}
            `}>
                {type === 'admin' && <AdminIcon />}
                {type === 'user' && <UserIcon />}
                {type === 'system' && <SystemIcon />}
                {type === 'support' && <SupportIcon />}
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
function AdminIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function SystemIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}