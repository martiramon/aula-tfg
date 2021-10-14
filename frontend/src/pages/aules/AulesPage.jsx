import { FormatColorResetOutlined } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
    Button,
    ButtonRed,
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
import { routes } from '../../constants/routes'
import { getToken, setAula, setToken } from '../../utils'
import {
    deleteAlumne,
    deleteAula,
    getAlumnes,
    getAules,
    postAlumne,
    postAula,
    getRespostes,
} from './aulesPage.services'

var equal = require('fast-deep-equal')
var nom

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
    const [showModalDeleteAula, setShowModalDeleteAula] = useState(false)

    const [alumneAct, setAlumneAct] = useState('')

    const [numRespostes, setNumRespostes] = useState('')
    const [ultimaResposta, setUltimaResposta] = useState('')

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

    const handleDeleteAula = async () => {
        console.log(aulaAct)
        const resp = await deleteAula(aulaAct._id)
        setIsClicked(false)
        setAulaAct('')
        setBusyT(true)
        if (!resp.error) {
            const response = await getAules()
            setData(
                response.aules.sort(function (a, b) {
                    if (a.nom < b.nom) return -1
                    if (a.nom > b.nom) return 1
                    return 0
                })
            )
        }
        setShowModalDeleteAula(false)
    }

    useEffect(() => {
        const omplirAules = async () => {
            const response = await getAules()
            if (!response.error) {
                var aux = response.aules.sort(function (a, b) {
                    if (a.nom < b.nom) return -1
                    if (a.nom > b.nom) return 1
                    return 0
                })
                if (equal(aux, data)) {
                } else {
                    setData(aux)
                }
                setBusy(false)
            } else {
                history.push(routes.login.url)
            }
        }
        omplirAules()
    }, [data])

    useEffect(() => {
        const calcularRespostes = () => {
            var counter = 0
            if (dataT) {
                for (var i = 0; i < dataT.length; i++) {
                    if (dataT[i].resposta) {
                        counter++
                    }
                }
                setNumRespostes(counter)
            }
        }
        calcularRespostes()
    }, [dataT])

    function replacer(key, value) {
        if (key === 'tableData') {
            return undefined
        }
        return value
    }

    useEffect(() => {
        const omplirAlumnes = async () => {
            if (isClicked) {
                const response = await getAlumnes(aulaAct._id)
                if (response.error) {
                    history.push(routes.login.url)
                } else if (response.alumnes) {
                    var aux2 = response.alumnes.sort(function (a, b) {
                        if (a.nom < b.nom) return -1
                        if (a.nom > b.nom) return 1
                        return 0
                    })
                    if (
                        equal(
                            JSON.stringify(aux2),
                            JSON.stringify(dataT, replacer)
                        )
                    ) {
                    } else {
                        setDataT(aux2)
                    }
                    setBusyT(false)
                } else {
                    setDataT('')
                }
            }
        }
        omplirAlumnes()
    }, [aulaAct, dataT])

    useEffect(() => {
        const ultimaResposta = async () => {
            if (isClicked) {
                if (aulaAct.test) {
                    const response = await getRespostes(aulaAct.test)
                    if (response.error) {
                        history.push(routes.login.url)
                    } else if (response.respostes.length > 0) {
                        console.log(response)
                        var mida = response.respostes.length
                        setUltimaResposta(response.respostes[mida - 1].autor)
                    } else {
                        console.log(response)
                        setUltimaResposta('')
                    }
                }
            }
        }
        ultimaResposta()
    }, [aulaAct])

    function nomAlumne() {
        for (var i = 0; i < dataT.length; i++) {
            if (dataT[i]._id == ultimaResposta) {
                return dataT[i].nom
            }
        }
    }

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
                        setAula(aula._id, aula.nom, aula.test)
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
                                    onClick={(e) => {
                                        e.preventDefault()
                                        history.push(routes.resultatsTest.url)
                                    }}
                                >
                                    Veure resultats del test
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
                                    onClick={(e) => {
                                        e.preventDefault()
                                        history.push(routes.crearTest.url)
                                    }}
                                >
                                    Crear el test
                                </Button>
                            )}
                            <ButtonRed
                                style={{
                                    paddingBottom: '0.5rem',
                                    paddingTop: '0.5rem',
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                    marginLeft: '2rem',
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowModalDeleteAula(true)
                                }}
                            >
                                Eliminar aula completa{' '}
                            </ButtonRed>
                        </div>
                        <h2>Codi únic d'Aula: {aulaAct.codi}</h2>
                    </div>
                ) : (
                    <div></div>
                )}
                {isBusyT ? (
                    <div></div>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: '7fr 3fr',
                        }}
                    >
                        <Mtable
                            style={{ width: '100%' }}
                            data={dataT}
                            onButtonClick={() => setShowModalAl(true)}
                            onDeleteClick={(alumne) => {
                                setAlumneAct(alumne)
                                setShowModalDelete(true)
                            }}
                        ></Mtable>
                        <InputCard
                            style={{
                                marginBottom: '0px',
                                marginLeft: '2rem',
                                padding: '1rem',
                                width: '94%',
                            }}
                        >
                            <h2 style={{ fontSize: '24px' }}>
                                Estadístiques de l'Aula
                            </h2>
                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nombre d'alumnes a l'aula:
                                </label>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {dataT.length}
                                </label>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nombre d'alumnes que ha contestat el test:
                                </label>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {aulaAct.test
                                        ? numRespostes
                                        : "Encara no s'ha creat el test"}
                                </label>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Percentatge d'alumnes que ha contestat el
                                    test:
                                </label>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {aulaAct.test
                                        ? (
                                              (numRespostes / dataT.length) *
                                              100
                                          ).toFixed(2) + '%'
                                        : '0' + '%'}
                                </label>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Últim alumne en respondre el test:
                                </label>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {aulaAct.test
                                        ? ((nom = nomAlumne()), nom)
                                        : "Encara no s'ha creat el test o no l'ha respòs ningú"}
                                </label>
                            </div>
                        </InputCard>
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
            <ModalDelete
                showModal={showModalDeleteAula}
                setShowModal={setShowModalDeleteAula}
                alumne={false}
                handleSubmit={() => {
                    handleDeleteAula()
                }}
            ></ModalDelete>
        </>
    )
}
