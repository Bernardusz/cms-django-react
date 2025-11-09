import Menu from "../../public/menu.svg?react"
const Header = () => {
    return(
        <header className="flex flex-row min-w-screen min-h-20 items-center justify-between p-5 bg-primary text-secondary fixed top-0 left-0 right-0 z-50 border-b-2 border-white">
            <h1 className="text-2xl font-heading ">Content Management System</h1>
            <Menu className="text-white" />
        </header>    
    )
}

export default Header;