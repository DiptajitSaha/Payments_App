import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SubHeader from "./SubHeader";
import TextBox from "./TextBox";
import BottomWarning from "./BottomWarning";
import axios from "axios";
import { userInfo } from "../user.js";

export default function SignUpCard() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = useRecoilValue(userInfo);
    const setUser = useSetRecoilState(userInfo);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signup/", {
                firstName,
                lastName,
                username,
                password
            });

            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);

                setUser({
                    firstName,
                    lastName,
                    username,
                    balance: 0
                });

                navigate("/dashboard");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="h-auto max-w-96 py-8 px-6 bg-white rounded-lg flex flex-col flex-grow justify-evenly gap-6 shadow-2xl">
            <div className="flex flex-col justify-evenly gap-2">
                <div className="flex justify-center">
                    <Header text={"Sign Up"} />
                </div>
                <div className="flex justify-center text-center">
                    <SubHeader text={"Enter Your information to create an account"} />
                </div>
            </div>
            <div className="flex flex-col items-center gap-3">
                <TextBox title={"First Name"} placeholder={"john"} setState={setFirstName} type={"name"} />
                <TextBox title={"Last Name"} placeholder={"doe"} setState={setLastName} type={"name"} />
                <TextBox title={"Email"} placeholder={"john@doe.com"} setState={setEmail} type={"email"} />
                <TextBox title={"Password"} placeholder={"•••••••••"} setState={setPassword} type={"password"} />
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-slate-800 text-white rounded-lg p-2 w-80 transition-all hover:bg-slate-900"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
            </div>
            <div className="flex justify-center">
                <BottomWarning text={"Already have an account?"} buttonText={"Log In"} to={"/signin"} />
            </div>
        </div>
    );
}
