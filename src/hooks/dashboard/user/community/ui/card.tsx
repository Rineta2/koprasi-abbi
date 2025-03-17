import { Supporter, User } from '@/hooks/dashboard/user/community/lib/schema'

import { Icons, formatDate } from '@/hooks/dashboard/user/community/ui/icons'

import { Timestamp as FirebaseTimestamp } from 'firebase/firestore'

export const SupporterCard = ({ supporter, expanded, onToggle }: { supporter: Supporter, expanded: boolean, onToggle: (supporterId: string) => void }) => (
    <div className="group bg-card/50 hover:bg-card-hover/50 backdrop-blur-sm rounded-xl border border-border/70 p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icons.Users />
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-primary">{supporter.username}</h4>
                    <p className="text-text-dark">{supporter.referralCode}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-text-dark bg-card/50 px-4 py-2 rounded-full">
                <Icons.Calendar />
                <span>{formatDate(supporter.joinedAt as FirebaseTimestamp)}</span>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-card/50 p-3 rounded-lg">
                <span className="text-text-dark">Bergabung:</span>
                <span className="font-medium text-primary">{supporter.count} Orang</span>
            </div>
            <div className="flex items-center gap-3 bg-card/50 p-3 rounded-lg">
                <span className="text-text-dark">Tipe:</span>
                <span className="font-medium text-primary">{supporter.type}</span>
            </div>
        </div>

        {supporter.usedBy && supporter.usedBy.length > 0 && (
            <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-text-dark">
                            Digunakan oleh ({supporter.usedBy.length})
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
                                    <span className="text-xs text-text-dark mt-2 sm:mt-0">
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