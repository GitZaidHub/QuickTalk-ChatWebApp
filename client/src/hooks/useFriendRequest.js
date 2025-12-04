import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useFriendRequest = () => {
    const [loading, setLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const { author } = useAuthContext();
    const token = author?.token;

    const sendFriendRequest = async (receiverId) => {
        setLoading(true);
        try {
            const res = await axios.post('/api/friend-requests/send', { receiverId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.error) {
                throw new Error(res.data.error);
            }
            toast.success("Friend request sent!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getPendingRequests = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/friend-requests/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.error) {
                throw new Error(res.data.error);
            }
            setPendingRequests(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const acceptFriendRequest = async (requestId) => {
        setLoading(true);
        try {
            const res = await axios.post('/api/friend-requests/accept', { requestId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.error) {
                throw new Error(res.data.error);
            }
            toast.success("Friend request accepted!");
            setPendingRequests(prev => prev.filter(req => req._id !== requestId));
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const rejectFriendRequest = async (requestId) => {
        setLoading(true);
        try {
            const res = await axios.post('/api/friend-requests/reject', { requestId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.error) {
                throw new Error(res.data.error);
            }
            toast.success("Friend request rejected");
            setPendingRequests(prev => prev.filter(req => req._id !== requestId));
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getPendingRequests();
        }
    }, [token]);

    return { loading, pendingRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getPendingRequests };
};

export default useFriendRequest;
