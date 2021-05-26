import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
    background: #ffffff;
    height: 3.5rem;
    display: flex;
    padding: 0.2rem 20rem;
    z-index: 14;
    align-items: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    /* Third Nav */
    /* justify-content: flex-start; */
`

export const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #000000;
    }
`
export const NavUser = styled.h2`
    color: #000000;
    display: flex;
    text-decoration: none;
    margin-left: auto;
    padding: 0 1rem;
    font-size: 1.2rem;
    font-weight: 500;
`

export const NavEscola = styled.h2`
    color: #808080;
    display: flex;
    text-decoration: none;
    padding: 0 1rem;
    font-size: 1.2rem;
    font-weight: 500;
`

export const NavLogo = styled.h1`
    color: #000000;
    display: flex;
    text-decoration: none;
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: 500;
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
  white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    /* Third Nav */
    /* justify-content: flex-end;
  width: 100vw; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled.button`
    border: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #bb4646;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 0.03rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 24px;
`
