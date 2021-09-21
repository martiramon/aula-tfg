import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    withStyles,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { FormatListBulleted } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { EntryPage } from '../../app.styles'
import {
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
import { getAula, getNomAula, getTestAula } from '../../utils'

import { getTest, getTestResp } from './resultatsTestPage.services'

import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma'
import { getAlumnes } from '../aules/aulesPage.services'

export const ResultatsTestPage = () => {
    const history = useHistory()

    const vermell = '#f04639'
    const taronja = '#f1953f'
    const verd = '#5de422'

    const nomAula = getNomAula()
    const idAula = getAula()
    const [isBusy, setBusy] = useState(true)
    const [test, setTest] = useState('')
    const [respostes, setRespostes] = useState('')
    var matriu

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />)

    //crear la matriu, amb els alumnes posats a la fila 0 i a la columna 0, i la resta de caselles buides
    const crearMatriu = function (alumnes) {
        const size = alumnes.length
        matriu = Array.from({ length: size + 1 }, () =>
            Array.from({ length: size + 1 }, () => null)
        )
        for (var i = 1; i <= size; i++) {
            matriu[i][0] = alumnes[i - 1]
            matriu[0][i] = alumnes[i - 1]
        }
    }

    //omplir cada fila de la matriu segons les respostes i segons si les preguntes eren positives o negatives
    const omplirFila = function (preguntes, respostes, fila) {
        for (var i = 0; i < 10; i++) {
            for (var j = 1; j < matriu.length; j++) {
                if (matriu[0][j]._id === respostes[i]._id) {
                    if (preguntes[i].positiva) matriu[fila][j]++
                    else matriu[fila][j]--
                }
            }
        }
    }

    //omplir la matriu mitjançant les respostes
    const omplirMatriu = function (test, respostes) {
        const sizeR = respostes.length
        const sizeM = matriu.length
        for (var i = 0; i < sizeR; i++) {
            for (var j = 1; j < sizeM; j++) {
                if (respostes[i].autor === matriu[j][0]._id)
                    omplirFila(test, respostes[i].respostes, j)
            }
        }
    }

    useEffect(() => {
        const carregarTest = async () => {
            const idTest = getTestAula()
            setTest(idTest)
            const response = await getTest(idTest)
            if (!response.error) {
                setTest(response.test.preguntes)
                setRespostes(response.test.respostes)
                const response2 = await getAlumnes(idAula)
                if (!response2.error) {
                    crearMatriu(response2.alumnes)
                    omplirMatriu(
                        response.test.preguntes,
                        response.test.respostes
                    )
                    console.log(matriu)
                    setBusy(false)
                } else {
                    history.push(routes.login.url)
                }
            } else {
                history.push(routes.login.url)
            }
        }
        carregarTest()
    }, [])

    let myGraph = {
        nodes: [
            { id: 'n1', label: 'Alice', color: verd },
            { id: 'n2', label: 'Rabbit', color: taronja },
        ],
        edges: [
            {
                id: 'e1',
                source: 'n1',
                target: 'n2',
                label: 'SEES',
                type: 'curvedArrow',
                color: vermell,
            },
        ],
    }

    return (
        <>
            <Navbar />
            {isBusy ? (
                <EntryPage
                    style={{
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    <InputCard
                        style={{
                            paddingTop: '14px',
                            marginTop: '5rem',
                            maxWidth: '900px',
                            minHeight: '700px',
                        }}
                    >
                        <h1>{nomAula}</h1>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </InputCard>
                </EntryPage>
            ) : (
                <EntryPage
                    style={{
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    <InputCard
                        style={{
                            paddingTop: '14px',
                            marginTop: '5rem',
                            maxWidth: '900px',
                            minHeight: '700px',
                        }}
                    >
                        {' '}
                        <h1>{nomAula}</h1>
                        <h2>Sociograma de les respostes:</h2>
                        <Sigma
                            renderer="canvas"
                            style={{
                                display: 'flex',
                                maxWidth: 'inherit',
                                height: '600px',
                            }}
                            graph={myGraph}
                            settings={{
                                drawEdges: true,
                                clone: false,
                                labelThreshold: '0',
                                minArrowSize: 10,
                            }}
                        >
                            <RelativeSize initialSize={15} />
                            <RandomizeNodePositions />
                        </Sigma>
                    </InputCard>
                </EntryPage>
            )}
        </>
    )
}
