import axios from 'axios'
import { React, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useGetConversation = () => {

    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
    const { author } = useAuthContext();
    const token = author?.token;

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/api/users`, { headers: { Authorization: `Bearer ${token}` } });
                // The backend now returns only friends
                const users = res.data;
                if (users.error) {
                    throw new Error(users.error)
                }
                setConversation(users)
            } catch (error) {
                toast.error(error.mesaage)
                console.log(error.mesaage)
            } finally {
                setLoading(false)
            }
        }
        getConversation();
    }, [])
    return { loading, conversation }
}

export default useGetConversation
