import { useEffect, useState } from 'react'
import {
    Button,
    ContainerAules,
    Input,
    InputCard,
    InputGroup,
    Modal,
} from '../../components'
import Mtable from '../../components/mtable/Mtable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getToken, setToken } from '../../utils'
import {
    getAlumnes,
    getAules,
    postAlumne,
    postAula,
} from './aulesPage.services'

export const AulesPage = () => {
    const [isBusy, setBusy] = useState(true)
    const [isBusyT, setBusyT] = useState(true)

    const [data, setData] = useState()
    const [dataT, setDataT] = useState()

    const [aulaAct, setAulaAct] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const [showModalAu, setShowModalAu] = useState(false)
    const [showModalAl, setShowModalAl] = useState(false)

    const handleSubmitAula = async (nomAu) => {
        const resp = await postAula(nomAu)
        setData((currentData) => {
            return [...currentData, resp]
        })
        setShowModalAu(false)
    }

    const handleSubmitAlumne = async (nomAl) => {
        const resp = await postAlumne(nomAl, aulaAct._id)
        setDataT((currentData) => {
            return [...currentData, resp]
        })
        setShowModalAl(false)
    }

    useEffect(() => {
        const omplirAules = async () => {
            const response = await getAules()
            setData(response.aules)
            setBusy(false)
        }
        omplirAules()
    }, [])

    useEffect(() => {
        const omplirAlumnes = async () => {
            if (isClicked) {
                const response = await getAlumnes(aulaAct._id)
                setDataT(response.alumnes)
                setBusyT(false)
            }
        }
        omplirAlumnes()
    }, [aulaAct])

    return (
        <>
            <Navbar />
            {isBusy ? (
                <Sidebar></Sidebar>
            ) : (
                <Sidebar
                    items={data}
                    onAulaClick={(aula) => {
                        setAulaAct(aula)
                        setIsClicked(true)
                    }}
                    onButtonClick={() => setShowModalAu(true)}
                ></Sidebar>
            )}
            <ContainerAules>
                {isClicked ? (
                    <div display="flex" flex-direction="row">
                        <h1>{aulaAct.nom}</h1>
                        <h2>{aulaAct.codi}</h2>
                    </div>
                ) : (
                    <div></div>
                )}
                {isBusyT ? (
                    <div></div>
                ) : (
                    <div>
                        <Mtable data={dataT}></Mtable>
                        <Button onClick={() => setShowModalAl(true)}>
                            Afegir alumne
                        </Button>
                    </div>
                )}
            </ContainerAules>
            <Modal
                showModal={showModalAu}
                setShowModal={setShowModalAu}
                aula={true}
                handleSubmit={(nom) => {
                    handleSubmitAula(nom)
                }}
            ></Modal>
            <Modal
                showModal={showModalAl}
                setShowModal={setShowModalAl}
                aula={false}
                handleSubmit={(nom) => {
                    handleSubmitAlumne(nom)
                }}
            ></Modal>
        </>
    )
}
