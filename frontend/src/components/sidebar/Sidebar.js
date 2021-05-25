import React from 'react'
import { List, ListElement, SideBtnLink, SideTitle } from './sidebarElements'

const Sidebar = ({ items }) => {
    return (
        <>
            <List>
                <SideTitle>AULES</SideTitle>
                {items ? (
                    items.map((nom) => (
                        <ListElement key={nom}>{nom}</ListElement>
                    ))
                ) : (
                    <ListElement>Carregant</ListElement>
                )}
                <SideBtnLink>Afegir aula</SideBtnLink>
            </List>
        </>
    )
}

export default Sidebar
