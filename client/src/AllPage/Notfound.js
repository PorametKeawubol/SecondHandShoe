import { Link } from "react-router-dom";
import Header from "../Component/Header";

function NotFound() {
    return (
        <div className="flex flex-col   backgroundAll ">
            <Header />
            <div className="flex flex-col  justify-center	 h-screen items-center">
                <p className="text-xl font-bold text-blue-900">404 Not Found</p>
                <Link to={"/"}>
                    <p className="text-sm p-4 font-bold text-blue-900 hover:text-black hover:underline-offset-2 ">
                        {"return to HomePage ->"}
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
