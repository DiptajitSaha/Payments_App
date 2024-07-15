
export default function SearchBar({setSearch}) {
    return (
        <div className="mx-6 my-2">
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3" placeholder="Search users..." autoFocus
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
        </div>
    )
}