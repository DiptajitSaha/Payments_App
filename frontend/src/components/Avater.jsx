
export default function Avater({userInfo}) {

    return (
        <div className="overflow-hidden w-14 h-14 rounded-full cursor-pointer flex-col justify-center items-center">
            {userInfo.avatar
                ? <img src={userInfo.avatar} alt="avatar" className=" transition-all hover:scale-110" />
                : <div className="text-3xl bg-slate-300 flex flex-col justify-center text-center h-14 text-slate-600 font-bold"> {userInfo.firstName[0]} </div>
            }
        </div>
    )
}