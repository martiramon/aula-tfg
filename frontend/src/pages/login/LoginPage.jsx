import { useState } from 'react'
import { EntryPage, LogoHeader } from '../../app.styles'
import {
    Button,
    Checkbox,
    Input,
    InputCard,
    InputGroup,
} from '../../components'
import { setToken } from '../../utils'
export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
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
                    <Checkbox id="rememberMe" />{' '}
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
