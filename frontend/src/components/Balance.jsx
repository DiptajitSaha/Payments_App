
export default function Balance({ balance }) {
    return (
        <div className="px-6 py-2">
            <div className="flex gap-3 font-mono text-4xl font-bold text-gray-500">
                <div> Your Balance </div>
                <div className="text-slate-900"> ₹{balance} </div>
            </div>
        </div>

    )
}