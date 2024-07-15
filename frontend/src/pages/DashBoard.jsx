import { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useRecoilState } from "recoil";
import { userInfo } from "../user.js";

export default function Dashboard() {
  const [user, setUser] = useRecoilState(userInfo);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <Appbar userInfo={user} />
      <div className="m-4">
        <Balance balance={user.balance} />
        <Users />
      </div>
    </div>
  );
}
