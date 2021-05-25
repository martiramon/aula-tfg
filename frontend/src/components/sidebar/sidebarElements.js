import styled from 'styled-components'

export const List = styled.ul`
    background: #ffffff;
    list-style-type: none;
    height: 100%;
    width: 19rem;
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    z-index: 12;
    align-items: center;
    margin-left: 1rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    /* Third Nav */
    /* justify-content: flex-start; */
`

export const ListElement = styled.li`
    background: #ffffff;
    list-style-type: none;
    height: 2.5rem;
    width: 3rem;
    display: flex;
    padding: 0.5rem;
    z-index: 12;
    align-items: center;
    justify-content: center;
    /* Third Nav */
    /* justify-content: flex-start; */
`

export const SideTitle = styled.h2`
    color: #000000;
    display: flex;
    text-decoration: none;
    padding: 0 1rem;
    margin-top: 3rem;
    font-size: 1.2rem;
    font-weight: 500;
`

export const SideBtnLink = styled.button`
    border: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #2f8bfd;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 0.03rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 0;
    margin-top: 1rem;
    /* Second Nav */
`
