import React, { useState } from 'react';

export default function AdminSettings() {
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSetAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Successfully set user as admin!');
                setUid('');
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage('Failed to set admin role');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

            <form onSubmit={handleSetAdmin} className="max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        User UID
                    </label>
                    <input
                        type="text"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter user UID"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Set as Admin'}
                </button>

                {message && (
                    <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </form>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">How to get User UID:</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li>User needs to sign in to the application</li>
                    <li>Go to Firebase Console → Authentication → Users</li>
                    <li>Find the user and copy their UID</li>
                    <li>Paste the UID in the form above</li>
                </ol>
            </div>
        </div>
    );
} 