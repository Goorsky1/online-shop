import { Link } from 'react-router-dom'
import "./menuCss.css"
export function Menu() {

    const menuItems = [
        { name: 'Products', path: '/' },
    ]

    // if user niezalogowany
    menuItems.push({ name: 'Register', path: '/register' })
    // else  
    // profile

    //if user niezalogowany 
    menuItems.push({ name: 'Log In', path: '/login' })
    // else 
    // logout

    // if user zalogowany
    // menuItems.push({ name: 'Cart', path: '/cart' })

    return (
        <div className='menu'>
            <ul>
                {menuItems.map(item =>
                    <li className='menu_item' key={item.name}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>,
                )}
            </ul>
        </div>
    )
}