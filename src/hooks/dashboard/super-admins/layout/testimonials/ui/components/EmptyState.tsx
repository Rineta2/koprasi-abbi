export const EmptyState = () => {
    return (
        <div className="text-center bg-white rounded-2xl shadow-md p-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Content Yet</h3>
            <p className="text-gray-500">Create your first content to get started</p>
        </div>
    )
}