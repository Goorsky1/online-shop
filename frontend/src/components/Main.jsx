import { Header } from './common/Header.jsx'
import Refresh from './common/Refresh.jsx'
import { Router } from './common/Router.jsx'


export function Main() {
    return (
        <div className='Main'>
            <Header />
            <Refresh />
            <div className='content'>
                <Router />
            </div>
        </div>
    )
}