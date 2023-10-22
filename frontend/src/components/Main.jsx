import { Menu } from './common/Menu.jsx'
import { Content } from './common/Content.jsx'
import { Router } from './common/Router.jsx'


export function Main() {
    return (
        <div className='Main'>
            <header className='header'>
                <h1 className='title'>Rolling Pin Shop</h1>
            </header>
            <Menu />
            <Router />
            <Content />
        </div>
    )
}