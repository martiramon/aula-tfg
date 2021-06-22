import { FormatColorResetOutlined } from '@material-ui/icons'
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
import Mtable from '../../components/mtable/Mtable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { routes } from '../../constants/routes'
import { getToken, setToken } from '../../utils'
import {
    deleteAlumne,
    getAlumnes,
    getAules,
    postAlumne,
    postAula,
} from './aulesPage.services'

export const AulesPage = () => {
    const history = useHistory()

    const [isBusy, setBusy] = useState(true)
    const [isBusyT, setBusyT] = useState(true)

    const [data, setData] = useState()
    const [dataT, setDataT] = useState()

    const [aulaAct, setAulaAct] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const [showModalAu, setShowModalAu] = useState(false)
    const [showModalAl, setShowModalAl] = useState(false)

    const [errorModal, setErrorModal] = useState(false)

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [alumneAct, setAlumneAct] = useState('')

    const handleSubmitAula = async (nomAu) => {
        const resp = await postAula(nomAu)
        if (!resp.error) {
            setData((currentData) => {
                return [...currentData, resp]
            })
            setErrorModal(false)
            setShowModalAu(false)
        } else {
            setErrorModal(true)
        }
    }

    const handleSubmitAlumne = async (nomAl) => {
        const resp = await postAlumne(nomAl, aulaAct._id)
        if (!resp.error) {
            setDataT((currentData) => {
                return [...currentData, resp]
            })
            setErrorModal(false)
            setShowModalAl(false)
        } else {
            setErrorModal(true)
        }
    }

    const handleDeleteAlumne = async () => {
        console.log(alumneAct)
        const resp = await deleteAlumne(alumneAct._id)
        if (!resp.error) {
            const response = await getAlumnes(aulaAct._id)
            setDataT(
                response.alumnes.sort(function (a, b) {
                    if (a.nom < b.nom) return -1
                    if (a.nom > b.nom) return 1
                    return 0
                })
            )
        }
        setShowModalDelete(false)
    }

    useEffect(() => {
        const omplirAules = async () => {
            const response = await getAules()
            if (!response.error) {
                setData(
                    response.aules.sort(function (a, b) {
                        if (a.nom < b.nom) return -1
                        if (a.nom > b.nom) return 1
                        return 0
                    })
                )
                setBusy(false)
            } else {
                history.push(routes.login.url)
            }
        }
        omplirAules()
    }, [])

    useEffect(() => {
        const omplirAlumnes = async () => {
            if (isClicked) {
                const response = await getAlumnes(aulaAct._id)
                if (response.alumnes) {
                    setDataT(
                        response.alumnes.sort(function (a, b) {
                            if (a.nom < b.nom) return -1
                            if (a.nom > b.nom) return 1
                            return 0
                        })
                    )
                    setBusyT(false)
                } else {
                    setDataT('')
                }
            }
        }
        omplirAlumnes()
    }, [aulaAct])

    return (
        <>
            <Navbar />
            {isBusy ? (
                <ClippedDrawer></ClippedDrawer>
            ) : (
                <ClippedDrawer
                    items={data}
                    onAulaClick={(aula) => {
                        setAulaAct(aula)
                        setIsClicked(true)
                    }}
                    onButtonClick={() => setShowModalAu(true)}
                >
                    {' '}
                </ClippedDrawer>
            )}
            <ContainerAules>
                {isClicked ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        {' '}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'start',
                            }}
                        >
                            <h1>{aulaAct.nom}</h1>
                            {aulaAct.test ? (
                                <Button
                                    style={{
                                        paddingBottom: '0.5rem',
                                        paddingTop: '0.5rem',
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                        marginLeft: '2rem',
                                    }}
                                >
                                    Veure test i resultats
                                </Button>
                            ) : (
                                <Button
                                    style={{
                                        paddingBottom: '0.5rem',
                                        paddingTop: '0.5rem',
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                        marginLeft: '2rem',
                                    }}
                                >
                                    Crear el test
                                </Button>
                            )}
                        </div>
                        <h2>Codi únic d'Aula: {aulaAct.codi}</h2>
                    </div>
                ) : (
                    <div></div>
                )}
                {isBusyT ? (
                    <div></div>
                ) : (
                    <div display="flex" style={{ width: '100%' }}>
                        <Mtable
                            data={dataT}
                            onButtonClick={() => setShowModalAl(true)}
                            onDeleteClick={(alumne) => {
                                setAlumneAct(alumne)
                                setShowModalDelete(true)
                            }}
                        ></Mtable>
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
                errorModal={errorModal}
            ></Modal>
            <Modal
                showModal={showModalAl}
                setShowModal={setShowModalAl}
                aula={false}
                handleSubmit={(nom) => {
                    handleSubmitAlumne(nom)
                }}
                errorModal={errorModal}
            ></Modal>
            <ModalDelete
                showModal={showModalDelete}
                setShowModal={setShowModalDelete}
                alumne={true}
                handleSubmit={() => {
                    handleDeleteAlumne()
                }}
            ></ModalDelete>
        </>
    )
}
