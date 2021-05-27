import React from 'react'
import { List, ListElement, SideBtnLink, SideTitle } from './sidebarElements'

const Sidebar = ({ items, onAulaClick }) => {
    return (
        <>
            <List>
                <SideTitle>AULES</SideTitle>
                {items ? (
                    items.map((aula) => (
                        <ListElement
                            key={aula._id}
                            onClick={() => onAulaClick(aula)}
                        >
                            {aula.nom}
                        </ListElement>
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
