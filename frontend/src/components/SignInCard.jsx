
import { useState } from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import TextBox from "./TextBox";
import BottomWarning from "./BottomWarning";

export default function SignInCard() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div className=" max-w-96 py-8 px-6 bg-white rounded-lg flex flex-col flex-grow justify-evenly gap-6 shadow-2xl">
            <div className="flex flex-col justify-evenly gap-2">
                <div className="flex justify-center">
                    <Header text={"Sign In"} />
                </div>
                <div className="flex justify-center text-center">
                    <SubHeader text={"Enter Your Credentials to access your account"} />
                </div>
            </div>
            <div className="flex flex-col items-center gap-3">
                <TextBox title={"Email"} placeholder={"john@doe.com"} setState={setEmail} type="email"/>
                <TextBox title={"Password"} placeholder={"•••••••••"} setState={setPassword} type={"password"}/>
            </div>
            <div className="flex justify-center">
                <button className="bg-slate-800 text-white rounded-lg p-2 w-80
                    /2 transition-all hover:bg-slate-900"
                    onClick={() => {

                    }}>Sign In</button>
            </div>
            <div className="flex justify-center">
                <BottomWarning text={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    )
}