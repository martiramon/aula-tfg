import { useEffect, useState } from 'react'
import { Button, Input, InputCard, InputGroup } from '../../components'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getToken, setToken } from '../../utils'
import { getAules, postAlumne, postAula } from './aulesPage.services'

var items = []

export const AulesPage = () => {
    const [isBusy, setBusy] = useState(true)
    var [data, setData] = useState()
    const [nomAu, setNomAu] = useState('')
    const [nomAl, setNomAl] = useState('')

    const handleSubmitAula = async (e) => {
        e.preventDefault()
        const resp = await postAula(nomAu)
        window.location.reload()
        console.log(resp)
    }

    const handleSubmitAlumne = async (e) => {
        e.preventDefault()
        const resp = await postAlumne(nomAl, '60a7ee6eaa077072c7066b92')
        window.location.reload()
        console.log(resp)
    }

    useEffect(() => {
        const omplirAules = async () => {
            data = await getAules()
            for (const { nom: n } of data.aules) {
                items.push(n)
            }
            items.sort()
            setBusy(false)
        }
        omplirAules()
    }, [])

    return (
        <>
            <Navbar />
            {isBusy ? <Sidebar></Sidebar> : <Sidebar items={items}></Sidebar>}
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
        </>
    )
}
