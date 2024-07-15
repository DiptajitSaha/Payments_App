import { Link } from "react-router-dom"
import Header from "./Header"
import Avater from "./Avater"

export default function Appbar({userInfo}) {
    
    return (
        <div className="flex justify-between px-10 py-4 shadow-md rounded-lg">
            <Header text={"Payments App"} />
            <div className="flex justify-between gap-4">
                <div className="text-2xl text-slate-800 font-bold flex flex-col justify-center">
                    Hello, {userInfo.firstName}!
                </div>

                <Link to={'/user'}>
                    <Avater userInfo={userInfo} />
                </Link>
            </div>
        </div>
    )
}