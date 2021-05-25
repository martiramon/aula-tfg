import React from 'react'
import { getEscola, getNom } from '../../utils'
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
    const activateLasers = () => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }
    return (
        <>
            <Nav>
                <NavLogo>AULA</NavLogo>
                <NavEscola>{getEscola()}</NavEscola>
                <NavUser> {getNom()} </NavUser>
                <NavBtn>
                    <NavBtnLink onClick={activateLasers}>
                        Tanca la sessió
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
