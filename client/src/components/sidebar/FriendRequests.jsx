import React from 'react';
import useFriendRequest from '../../hooks/useFriendRequest';
import { Check, X, Loader2 } from "lucide-react";

const FriendRequests = () => {
    const { pendingRequests, acceptFriendRequest, rejectFriendRequest, loading } = useFriendRequest();

    if (loading && pendingRequests.length === 0) {
        return (
            <div className="flex justify-center items-center py-8 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span className="text-sm">Loading requests...</span>
            </div>
        );
    }

    if (pendingRequests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <p className="text-sm">No pending requests</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 p-2">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-2 mb-2">Friend Requests</h3>
            {pendingRequests.map((request) => (
                <div key={request._id} className="group flex items-center justify-between p-3 bg-white hover:bg-slate-50 rounded-xl transition-all duration-200 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={request.sender.profilePic}
                                alt="user avatar"
                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-slate-900 text-sm">{request.sender.fullName}</p>
                            <p className="text-xs text-slate-500">@{request.sender.username}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => acceptFriendRequest(request._id)}
                            className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all duration-200"
                            title="Accept"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => rejectFriendRequest(request._id)}
                            className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                            title="Reject"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;
