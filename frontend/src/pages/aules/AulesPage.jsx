import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getToken, setToken } from '../../utils'
import { getAules } from './aulesPage.services'

var items = []

export const AulesPage = () => {
    const [isBusy, setBusy] = useState(true)
    var [data, setData] = useState()

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
        </>
    )
}
