import Header from "../components/Header";

export default function Send() {
    return (
        <div className=" h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white h-auto w-auto shadow-lg rounded-lg p-16 flex flex-col items-center  gap-20">
                <Header text={"Send Money"} />
                <div>
                    <div className="flex">
                        <div className="bg-green-500 h-16 w-16 text-4xl text-white flex flex-col justify-center text-center rounded-full">
                            A 
                        </div>
                        <div className="p-4 text-3xl font-bold flex flex-col justify-center items-center"> 
                            Friend's Name
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="px-2 py-1"> Amount (in Rs.) </div>
                        <input type="text" placeholder="Enter amount" className="border px-4 py-2 w-full"/>
                    </div>
                    <div className="p-2 bg-green-500 text-white rounded-lg text-center">
                        <button> Initiate Transfer </button>
                    </div>
                </div>
            </div>
        </div>
    )
}