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

var graf = { nodes: [], edges: [] }
var grafP = { nodes: [], edges: [] }
var grafN = { nodes: [], edges: [] }
var matriu

export const ResultatsTestPage = () => {
    const history = useHistory()

    const vermell = '#f04639'
    const taronja = '#f1953f'
    const verd = '#5de422'
    const negre = '#000000'

    const nomAula = getNomAula()
    const idAula = getAula()
    const [isBusy, setBusy] = useState(true)
    const [test, setTest] = useState('')
    const [respostes, setRespostes] = useState('')
    const [tipusGraf, setTipusGraf] = useState('complet')

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

    const calcularIndex = function () {
        var sizeM = matriu.length
        var indexP = 0
        var indexN = 0
        for (var j = 1; j < sizeM; j++) {
            for (var i = 1; i < sizeM; i++) {
                if (matriu[i][j] > 0) indexP += matriu[i][j]
                if (matriu[i][j] < 0) indexN -= matriu[i][j]
            }
            matriu[j][0].indexT = indexP - indexN
            matriu[j][0].indexP = indexP
            matriu[j][0].indexN = indexN
            indexP = 0
            indexN = 0
        }
    }

    const crearGrafComplet = function () {
        graf = { nodes: [], edges: [] }
        var sizeM = matriu.length
        for (var i = 1; i < sizeM; i++) {
            for (var j = 0; j < sizeM; j++) {
                if (j === 0) {
                    if (matriu[i][j].indexT === 0) {
                        graf.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: taronja,
                        })
                    } else if (matriu[i][j].indexT > 0) {
                        graf.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: verd,
                        })
                    } else {
                        graf.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: vermell,
                        })
                    }
                } else if (matriu[i][j]) {
                    if (matriu[i][j] > 0) {
                        graf.edges.push({
                            id: '' + i + j,
                            source: matriu[i][0]._id,
                            target: matriu[0][j]._id,
                            type: 'curvedArrow',
                            color: verd,
                        })
                    } else {
                        graf.edges.push({
                            id: '' + i + j,
                            source: matriu[i][0]._id,
                            target: matriu[0][j]._id,
                            type: 'curvedArrow',
                            color: vermell,
                        })
                    }
                }
            }
        }
        console.log(graf)
    }

    const crearGrafPositiu = function () {
        grafP = { nodes: [], edges: [] }
        var sizeM = matriu.length
        for (var i = 1; i < sizeM; i++) {
            for (var j = 0; j < sizeM; j++) {
                if (j === 0) {
                    if (matriu[i][j].indexP === 0) {
                        grafP.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: negre,
                        })
                    } else {
                        grafP.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: verd,
                        })
                    }
                } else if (matriu[i][j]) {
                    if (matriu[i][j] > 0) {
                        grafP.edges.push({
                            id: '' + i + j,
                            source: matriu[i][0]._id,
                            target: matriu[0][j]._id,
                            type: 'curvedArrow',
                            color: verd,
                        })
                    }
                }
            }
        }
        console.log(grafP)
    }

    const crearGrafNegatiu = function () {
        grafN = { nodes: [], edges: [] }
        var sizeM = matriu.length
        for (var i = 1; i < sizeM; i++) {
            for (var j = 0; j < sizeM; j++) {
                if (j === 0) {
                    if (matriu[i][j].indexN === 0) {
                        grafN.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: negre,
                        })
                    } else {
                        grafN.nodes.push({
                            id: matriu[i][j]._id,
                            label: matriu[i][j].nom,
                            color: vermell,
                        })
                    }
                } else if (matriu[i][j]) {
                    if (matriu[i][j] < 0) {
                        grafN.edges.push({
                            id: '' + i + j,
                            source: matriu[i][0]._id,
                            target: matriu[0][j]._id,
                            type: 'curvedArrow',
                            color: vermell,
                        })
                    }
                }
            }
        }
        console.log(grafN)
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
                    calcularIndex()
                    console.log(matriu)
                    crearGrafComplet()
                    crearGrafPositiu()
                    crearGrafNegatiu()
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

    const handleChange = (event) => {
        setTipusGraf(event.target.value)
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
                        <h2 style={{ marginBottom: '20px' }}>
                            Sociograma de les respostes:
                        </h2>
                        {graf.edges.length !== 0 ? (
                            <div>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="seleccioGraf"
                                        name="row-radio-buttons-group"
                                        value={tipusGraf}
                                        onChange={handleChange}
                                        style={{ marginBottom: '20px' }}
                                    >
                                        <FormControlLabel
                                            value="complet"
                                            control={<Radio />}
                                            label="Graf complet"
                                        />
                                        <FormControlLabel
                                            value="positiu"
                                            control={<Radio />}
                                            label="Només interaccions positives"
                                        />
                                        <FormControlLabel
                                            value="negatiu"
                                            control={<Radio />}
                                            label="Només interaccions negatives"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                {tipusGraf === 'complet' && (
                                    <Sigma
                                        renderer="canvas"
                                        style={{
                                            display: 'flex',
                                            maxWidth: 'inherit',
                                            height: '510px',
                                        }}
                                        graph={graf}
                                        settings={{
                                            drawEdges: true,
                                            clone: false,
                                            labelThreshold: '0',
                                            minArrowSize: 10,
                                            minNodeSize: 8,
                                            maxNodeSize: 8.1,
                                        }}
                                    >
                                        <RelativeSize initialSize={15} />
                                        <RandomizeNodePositions />
                                    </Sigma>
                                )}
                                {tipusGraf === 'positiu' && (
                                    <Sigma
                                        renderer="canvas"
                                        style={{
                                            display: 'flex',
                                            maxWidth: 'inherit',
                                            height: '510px',
                                        }}
                                        graph={grafP}
                                        settings={{
                                            drawEdges: true,
                                            clone: false,
                                            labelThreshold: '0',
                                            minArrowSize: 10,
                                            minNodeSize: 8,
                                            maxNodeSize: 8.1,
                                        }}
                                    >
                                        <RelativeSize initialSize={15} />
                                        <RandomizeNodePositions />
                                    </Sigma>
                                )}
                                {tipusGraf === 'negatiu' && (
                                    <Sigma
                                        renderer="canvas"
                                        style={{
                                            display: 'flex',
                                            maxWidth: 'inherit',
                                            height: '510px',
                                        }}
                                        graph={grafN}
                                        settings={{
                                            drawEdges: true,
                                            clone: false,
                                            labelThreshold: '0',
                                            minArrowSize: 10,
                                            minNodeSize: 8,
                                            maxNodeSize: 8.1,
                                        }}
                                    >
                                        <RelativeSize initialSize={15} />
                                        <RandomizeNodePositions />
                                    </Sigma>
                                )}
                            </div>
                        ) : (
                            <h3>Encara no hi ha cap resposta dels alumnes</h3>
                        )}
                    </InputCard>
                </EntryPage>
            )}
        </>
    )
}
