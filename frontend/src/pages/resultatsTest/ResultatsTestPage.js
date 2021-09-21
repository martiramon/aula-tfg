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

import { getTestResp } from './resultatsTestPage.services'

import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma'

export const ResultatsTestPage = () => {
    const history = useHistory()

    const nomAula = getNomAula()
    const idAula = getAula()
    const [isBusy, setBusy] = useState(true)
    const [test, setTest] = useState('')
    const [respostes, setRespostes] = useState('')

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />)

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`)
    }

    useEffect(() => {
        const carregarTest = async () => {
            const idTest = getTestAula()
            setTest(idTest)
            const response = await getTestResp(idTest)
            if (!response.error) {
                setRespostes(response.respostes)
                console.log(response.respostes)
                setBusy(false)
            } else {
                history.push(routes.login.url)
            }
        }
        carregarTest()
    }, [])

    let myGraph = {
        nodes: [
            { id: 'n1', label: 'Alice' },
            { id: 'n2', label: 'Rabbit' },
        ],
        edges: [{ id: 'e1', source: 'n1', target: 'n2', label: 'SEES' }],
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
                            renderer="webgl"
                            style={{
                                display: 'flex',
                                maxWidth: 'inherit',
                                height: '400px',
                            }}
                            graph={myGraph}
                            settings={{
                                drawEdges: true,
                                clone: false,
                                labelThreshold: '0',
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
