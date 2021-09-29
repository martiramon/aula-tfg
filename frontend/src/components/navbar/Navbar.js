import React from 'react'
import { routes } from '../../constants/routes'
import { getEscola, getNom } from '../../utils'
import { useHistory } from 'react-router'
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavUser,
    NavLogo,
    NavEscola,
} from './navbarElements'

const Navbar = () => {
    const history = useHistory()
    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        history.push(routes.login.url)
    }
    const handleClick = () => {
        history.push(routes.aules.url)
    }
    return (
        <>
            <Nav>
                <NavLogo onClick={handleClick}>AULA</NavLogo>
                <NavEscola>{getEscola()}</NavEscola>
                <NavUser> {getNom()} </NavUser>
                <NavBtn>
                    <NavBtnLink onClick={handleLogout}>
                        Tanca la sessió
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
