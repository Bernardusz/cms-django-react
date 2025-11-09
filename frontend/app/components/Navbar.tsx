import useTokenState from "~/context/token";
import useNavbar from "~/context/navbar";

const Navbar = () => {
    const isLoggedIn = useTokenState((state) => state.isLoggedIn)
    const isOpen = useNavbar((state) => state.isOpen)
    return (
        <div className={`
            ${isOpen ? "max-h-96 opacity-100" : "h-0 opacity-0"}
            transition-all duration-1000 ease-in-out
            w-full overflow-hidden
        `}>
            { isLoggedIn ? (
            
                <nav className="flex flex-col w-full h-full">
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Home</div>
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Profile</div>
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Dashboard</div>
                </nav>  
            ) : (
                <nav className="flex flex-col w-full h-full">
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Landing Page</div>
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Login</div>
                    <div className="h-fit p-2 border-2 border-orange-primary w-full flex flex-col bg-primary border-white justify-center items-center font-main">Sign In</div>
                </nav>
            )}
        </div>
    );
}

export default Navbar;