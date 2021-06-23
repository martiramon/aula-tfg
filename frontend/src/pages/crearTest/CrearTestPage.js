import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
    Button,
    ContainerAules,
    Input,
    InputCard,
    InputGroup,
    Modal,
    ModalDelete,
} from '../../components'
import ClippedDrawer from '../../components/drawer/Drawer'
import Navbar from '../../components/navbar/Navbar'
import { routes } from '../../constants/routes'

export const CrearTestPage = () => {
    const history = useHistory()
    return (
        <>
            <Navbar />
        </>
    )
}
