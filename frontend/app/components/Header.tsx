import Menu from "../../public/menu.svg?react"
import useNavbar from "~/context/navbar";
import Navbar from "./Navbar";
const Header = () => {
    const toggleIsOpen = useNavbar((state) => state.toggleIsOpen)
    return(
        <div className="flex flex-col fixed top-0 left-0 right-0 z-50 border-b-2 border-white">
            <header className="flex flex-row min-w-screen min-h-20 items-center justify-between p-5 bg-primary text-secondary ">
                <h1 className="text-2xl font-heading ">Content Management System</h1>
                <Menu className="text-white hover:text-orange-400" onClick={toggleIsOpen}/>
                
            </header>
            <Navbar />    
        </div>
    )

}

export default Header;