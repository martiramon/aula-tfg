import { useEffect, useState } from 'react'
import { Button, Input, InputCard, InputGroup } from '../../components'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getToken, setToken } from '../../utils'
import { getAules, postAula } from './aulesPage.services'

var items = []

export const AulesPage = () => {
    const [isBusy, setBusy] = useState(true)
    var [data, setData] = useState()
    const [nom, setNom] = useState('')

    const handleSubmitAula = async (e) => {
        e.preventDefault()
        const resp = await postAula(nom)
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
                            value={nom}
                            onChange={(e) => {
                                setNom(e.target.value)
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
