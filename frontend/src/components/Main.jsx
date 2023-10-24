import { Header } from './common/Header.jsx'
import { Router } from './common/Router.jsx'


export function Main() {
    return (
        <div className='Main'>
            <Header />
            <div className='content'>
                <Router />
            </div>
        </div>
    )
}