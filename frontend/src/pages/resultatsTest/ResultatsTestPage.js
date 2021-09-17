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

import { Graph } from 'react-d3-graph'
import { getTestResp } from './resultatsTestPage.services'

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

    const data = {
        nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
        links: [
            { source: 'Harry', target: 'Sally' },
            { source: 'Harry', target: 'Alice' },
        ],
    }

    const myConfig = {
        nodeHighlightBehavior: true,
        directed: true,
        staticGraph: false,
        node: {
            color: 'lightgreen',
            fontSize: 12,
            highlightFontSize: 12,
            size: 700,
            highlightStrokeColor: 'blue',
        },
        link: {
            highlightColor: 'lightblue',
        },
    }

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
                console.log(respostes)
                setBusy(false)
            } else {
                history.push(routes.login.url)
            }
        }
        carregarTest()
    }, [])

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
                        <div>
                            <Graph
                                id="graph-id" // id is mandatory
                                data={data}
                                config={myConfig}
                                onClickNode={onClickNode}
                            />
                            ;
                        </div>
                    </InputCard>
                </EntryPage>
            )}
        </>
    )
}
