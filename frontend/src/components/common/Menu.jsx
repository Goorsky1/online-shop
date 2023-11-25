import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getUserData, removeUserData } from '../../utils/userSession'
import "./menuCss.css"
import createApiClient from '../../utils/apiClient'
import React, { useState, useLayoutEffect, useEffect } from 'react'

export function Menu() {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Products', path: '/' },
    ]

    const userData = getUserData()
    if (userData) {
        menuItems.push({ name: 'Profile', path: '/profile' })
        menuItems.push({ name: 'Cart', path: '/cart' })
        if (userData.user.user_permissions==="worker")
            menuItems.push({ name: 'Admin Panel', path: '/admin/panel' })
        menuItems.push({
            name: 'Log Out', path: '/', onClickFunc: () => {
                removeUserData()
                navigate('/')
            }
        })
    } else {
        menuItems.push({ name: 'Register', path: '/register' })
        menuItems.push({ name: 'Log In', path: '/login' })
    }

    return (
        <div className='menu' >
            <ul>
                {menuItems.map(item =>
                    <li className='menu_item' key={item.name}>
                        {
                            item.onClickFunc ?
                                <Link to={item.path}><span onClick={item.onClickFunc}>{item.name}</span></Link> :
                                <Link to={item.path}>{item.name}</Link>
                        }
                    </li>,
                )}
            </ul>
        </div>
    )
}
