import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import User from "./User";

export default function Users() {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([
        { id: 1, firstName: "John", lastName:"Johnson", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 2, firstName: "Jane", lastName: "Jenny", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 3, firstName: "Bob", lastName: "Marley", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: 4, firstName: "Rob", lastName: "Jobs", avatar: "https://i.pravatar.cc/150?img=7" },
    ]);

    useEffect(() => {
    }, [search])

    return (
        <div >
            <div className="px-6 py-2 text-2xl text-slate-600 font-mono font-bold"> Users </div>
            <SearchBar setSearch={setSearch} />
            <div className="m-4 flex flex-col gap-4 bg-gray-100 rounded-2xl">
                {users.map((user) => <User user={user} key={user.id} />)}
            </div>
        </div>
    )
}