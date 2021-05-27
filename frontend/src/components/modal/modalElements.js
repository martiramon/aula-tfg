import styled from 'styled-components'

export const Modal = styled.div`
    /* Third Nav */
    /* justify-content: flex-start; */
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    display: block;
    width: 60vw;
    height: 60%;
    min-height: 400px;
    min-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    padding-bottom: 20px;
    background-color: #fff;
    align-self: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 250ms 250ms ease, transform 300ms 250ms ease;
    transform: scale(0);
`
export const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background: #ffffffff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 15;
    border-radius: 10px;
`
