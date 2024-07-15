import { Link } from "react-router-dom";
import Avater from "./Avater";

export default function User({user}) {
    return (
        <div className="px-6 py-2 flex justify-between">
            <div className="flex justify-between gap-4">
                <Avater userInfo={user} />
                <div className="flex flex-col justify-center text-slate-800 text-xl font-bold"> {user.firstName + " " + user.lastName} </div>
            </div>
            <Link to={"/send"} className="flex justify-center flex-col items-center bg-slate-800 h-14 w-40 text-white font-bold rounded-lg transition-all hover:text-slate-300 hover:bg-slate-600"> 
                Send Money 
            </Link>
            
        </div>
    )
}