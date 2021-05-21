import { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { EntryPage, LogoHeader } from '../../app.styles'
import {
    Button,
    Checkbox,
    Input,
    InputCard,
    InputGroup,
} from '../../components'
import { routes } from '../../constants/routes'
import { setToken } from '../../utils'
import { loginService } from './loginPage.services'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRemembering, setIsRemembering] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await loginService(email, password)
        setToken(resp.accessToken, !isRemembering)
        history.push(routes.aules.url)
        console.log(resp)
    }

    return (
        <EntryPage>
            <LogoHeader>AULA</LogoHeader>
            <InputCard>
                <h2>Iniciar Sessió</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Correu electrònic</label>
                        <Input
                            type="text"
                            placeholder="aula@aula.com"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>Contrasenya</label>
                        <Input
                            type="password"
                            placeholder="********"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </InputGroup>
                    <Checkbox
                        id="rememberMe"
                        onChange={(e) => setIsRemembering(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Recorda'm</label>
                    <Button type="submit" width="100%">
                        Iniciar Sessió
                    </Button>
                </form>
                <span>
                    No estàs registrat?
                    <a href="/signup">Registra't</a>
                </span>
            </InputCard>
        </EntryPage>
    )
}
