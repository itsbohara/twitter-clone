import React from 'react'

export default function EmptyTweet({ title, desc }: { title, desc?}) {
    return (
        <div className="no-tweets py-6 px-4 md:p-12">
            <h2 className="text-3xl font-extrabold max-sm:font-bold">{title}
            </h2>
            <span className="text-sm text-slate-600">{desc ?? 'When they do, their Tweets will show up here.'}
            </span>
        </div>
    )
}
