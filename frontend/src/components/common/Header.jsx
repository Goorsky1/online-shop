import { Menu } from "./Menu";

export function Header() {
    return (
        <div className="pageHeader">
            <header className='header'>
                <h1 className='title'>Rolling Pin Shop</h1>
            </header>
            <Menu />
        </div>
    )
}