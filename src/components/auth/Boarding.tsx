import React from 'react'

import Button from "@ui/Button";
import { SiTwitter } from 'react-icons/si';
import { useRouter } from 'next/router';
import { useModalAction, useModalState } from '@ctx/ModalContext';


export default function AuthBoardingModal({ }) {
    const { push } = useRouter()
    const { closeModal } = useModalAction()
    const { data } = useModalState()

    const authRoute = (route) => {
        closeModal();
        push(`auth/${route}`)
    }

    const title = data?.title ?? `Don't miss what's happening`
    const desc = data?.desc ?? 'People on Twitter are the first to know.'

    return (
        <div className='p-4 md:p-14 flex flex-col gap-8'>
            <div className="flex justify-center">
                <SiTwitter className="w-12 h-12 text-[#1da1f2]" />
            </div>
            <div>
                <h1 className="text-2xl font-extrabold">
                    {title}
                </h1>
                <span className="text-slate-500 text-sm">
                    {desc}
                </span>
            </div>
            <div className="flex flex-col gap-3 auth-btns">
                <Button onClick={() => authRoute('login')} size='large' className='w-full !bg-[#1d9bf0] hover:!bg-blue-400' center>Log in</Button>
                <Button onClick={() => authRoute('register')} intent='outline' size='large' className='w-full hover:bg-blue-50' center>Sign up</Button>
            </div>
        </div>
    );
};
