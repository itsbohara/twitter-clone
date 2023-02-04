import { useModalAction } from '@ctx/ModalContext';
import { useAppDispatch } from '@hook/useApp';
import useAuth from '@hook/useAuth';
import { getProfileTweets } from '@redux/slices/profile.slice';
import Loading from '@ui/Loading';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function MediaTweets() {
    const { openModal } = useModalAction()
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const {
        query: { username },
    } = useRouter();

    useEffect(() => {
        if (!user) {
            openModal('AUTH_BOARDING')
            return;
        }
        const getLikedTweets = async () => {
            dispatch(getProfileTweets(username, { media: true }));
            setLoading(false);
        };
        getLikedTweets();
        return () => setLoading(true);
    }, []);

    if (loading) return <Loading />;

    return (
        <div>MediaTweets : Not Available</div>
    )
}
