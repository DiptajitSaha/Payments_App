import { Link } from "react-router-dom";

export default function BottomWarning({text, buttonText, to}) {
    return (
        <div className="flex gap-2">
            <div> {text} </div>
            <Link to={to} className="pointer underline">
                {buttonText}
            </Link>
        </div>
    )
}