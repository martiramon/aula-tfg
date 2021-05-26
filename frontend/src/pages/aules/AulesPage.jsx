import { useEffect, useState } from 'react'
import {
    Button,
    ContainerAules,
    Input,
    InputCard,
    InputGroup,
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

    const [nomAu, setNomAu] = useState('')
    const [nomAl, setNomAl] = useState('')

    const handleSubmitAula = async (e) => {
        e.preventDefault()
        const resp = await postAula(nomAu)
        setData((currentData) => {
            return [...currentData, resp]
        })
    }

    const handleSubmitAlumne = async (e) => {
        e.preventDefault()
        const resp = await postAlumne(nomAl, '60a7ee6eaa077072c7066b92')
        setDataT((currentData) => {
            return [...currentData, resp]
        })
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
            const response = await getAlumnes('1r A')
            setDataT(response.alumnes)
            setBusyT(false)
        }
        omplirAlumnes()
    }, [])

    return (
        <>
            <Navbar />
            {isBusy ? (
                <Sidebar></Sidebar>
            ) : (
                <Sidebar
                    items={data}
                    onAulaClick={(id) => console.log(id)}
                ></Sidebar>
            )}
            <ContainerAules>
                <InputCard>
                    <form onSubmit={handleSubmitAula}>
                        <InputGroup>
                            <label>Nom de l'Aula</label>
                            <Input
                                type="text"
                                placeholder="1r A"
                                required
                                value={nomAu}
                                onChange={(e) => {
                                    setNomAu(e.target.value)
                                }}
                            ></Input>
                        </InputGroup>
                        <Button type="submit" width="25%">
                            Afegir
                        </Button>
                    </form>
                </InputCard>
                <InputCard>
                    <form onSubmit={handleSubmitAlumne}>
                        <InputGroup>
                            <label>Nom i cognoms de l'alumne</label>
                            <Input
                                type="text"
                                placeholder="Carles Porta Gaset"
                                required
                                value={nomAl}
                                onChange={(e) => {
                                    setNomAl(e.target.value)
                                }}
                            ></Input>
                        </InputGroup>
                        <Button type="submit" width="25%">
                            Afegir
                        </Button>
                    </form>
                </InputCard>
                {isBusyT ? <Mtable></Mtable> : <Mtable data={dataT}></Mtable>}{' '}
            </ContainerAules>
        </>
    )
}
