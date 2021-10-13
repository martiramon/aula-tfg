import styled from 'styled-components'

export const List = styled.div`
    background: #ffffff;
    list-style-type: none;
    height: 100%;
    width: 19rem;
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    z-index: 12;
    align-items: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    position: fixed;
    left: 0;
    top: 3.7rem;
    /* Third Nav */
    /* justify-content: flex-start; */
`

export const ListElement = styled.div`
    list-style-type: none;
    height: 2.5rem;
    width: 3rem;
    display: flex;
    padding: 0.5rem;
    z-index: 12;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: '#f0f0f0';
    }
    /* Third Nav */
    /* justify-content: flex-start; */
`

export const SideTitle = styled.h2`
    color: #000000;
    display: flex;
    text-decoration: none;
    padding: 0 1rem;
    margin-top: 3rem;
    margin-right: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
`

export const SideBtnLink = styled.button`
    border: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #3f51b5;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 0.03rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 1rem;
    margin-top: 1rem;
    /* Second Nav */
`
