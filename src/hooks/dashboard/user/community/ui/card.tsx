import { Supporter, User } from '@/hooks/dashboard/user/community/lib/schema'

import { Icons, formatDate } from '@/hooks/dashboard/user/community/ui/icons'

import { Timestamp as FirebaseTimestamp } from 'firebase/firestore'

export const SupporterCard = ({ supporter, expanded, onToggle }: { supporter: Supporter, expanded: boolean, onToggle: (supporterId: string) => void }) => (
    <div className="group bg-gradient-to-br from-card/60 to-card/40 hover:from-card-hover/60 hover:to-card-hover/40 backdrop-blur-sm rounded-xl border border-border/70 p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
        {/* Status indicator - visual cue */}
        <div className={`absolute top-0 left-0 w-2 h-full ${supporter.status === 'premium' ? 'bg-primary' : 'bg-gray-300'
            }`}></div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner">
                    <Icons.Users />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg text-primary">{supporter.username}</h4>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${supporter.status === 'premium'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-gray-200 text-gray-700'
                            }`}>
                            {supporter.status || 'N/A'}
                        </span>
                    </div>
                    <p className="text-sm font-mono mt-1 bg-card/50 px-2 py-0.5 rounded text-text-dark">{supporter.referralCode}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-text-dark bg-card/50 px-4 py-2 rounded-full">
                <Icons.Calendar />
                <span>{formatDate(supporter.joinedAt as FirebaseTimestamp)}</span>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-card/50 p-3 rounded-lg">
                <span className="text-text-dark font-medium">Bergabung:</span>
                <span className="font-medium text-primary">{supporter.count} Orang</span>
            </div>
            <div className="flex items-center gap-3 bg-card/50 p-3 rounded-lg">
                <span className="text-text-dark font-medium">Tipe:</span>
                <span className="font-medium text-primary">{supporter.type}</span>
            </div>
            <div className="flex items-center gap-3 bg-card/50 p-3 rounded-lg">
                <span className="text-text-dark font-medium">Status:</span>
                <span className={`font-medium ${supporter.status === 'premium' ? 'text-primary' : 'text-gray-600'} capitalize`}>
                    {supporter.status || 'N/A'}
                </span>
            </div>
        </div>

        {supporter.usedBy && supporter.usedBy.length > 0 && (
            <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-text-dark flex items-center gap-2">
                            Digunakan oleh
                            <span className="bg-card/50 text-primary px-2 py-0.5 rounded-full">
                                {supporter.usedBy.length}
                            </span>
                        </h5>
                        <button
                            onClick={() => onToggle(supporter.uid)}
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-all px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20"
                        >
                            {expanded ? "Sembunyikan" : "Lihat Semua"}
                            <Icons.ChevronDown className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    <div className="grid gap-3">
                        {supporter.usedBy
                            .slice(0, expanded ? undefined : 2)
                            .map((user: User, idx: number) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-card/50 border border-border/70 hover:bg-card-hover/50 transition-all"
                                >
                                    <span className="font-medium text-primary">{user.username}</span>
                                    <span className="text-xs bg-card/50 px-2 py-1 rounded-full text-text-dark mt-2 sm:mt-0">
                                        {formatDate(user.joinedAt as FirebaseTimestamp)}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        )}
    </div>
)