export const MessageSkeleton = () => {
    return (
        <div className="animate-pulse flex-1 flex flex-col w-full max-h-[72%]">
            {
                Array.from({length:7}).map((elem,idx) => {
                    return (
                        <div key={idx} className={`${idx%2==0?"justify-end ml-auto":"justify-start"} mt-2 w-40 h-[70px] bg-gray-200 rounded-xl dark:bg-gray-500`}></div>
                    )
                })
            }
        </div>
    )
}
