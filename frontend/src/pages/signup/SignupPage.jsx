import { useState } from 'react'
import { useHistory } from 'react-router'
import { EntryPage, LogoHeader } from '../../app.styles'
import { Button, Input, InputCard, InputGroup } from '../../components'
import { routes } from '../../constants/routes'
import { signupService } from './signupPage.services'

export const SignupPage = () => {
    const [nom, setNom] = useState('')
    const [escola, setEscola] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await signupService(email, password, nom, escola)
        history.push(routes.login.url)
        console.log(resp)
    }

    return (
        <EntryPage>
            <LogoHeader>AULA</LogoHeader>
            <InputCard>
                <h2>Registrar-se</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Nom complet</label>
                        <Input
                            type="text"
                            placeholder="Martí Ramon Ros"
                            required
                            value={nom}
                            onChange={(e) => {
                                setNom(e.target.value)
                            }}
                        ></Input>
                    </InputGroup>
                    <InputGroup>
                        <label>Centre escolar</label>
                        <Input
                            type="text"
                            placeholder="El Montcau"
                            required
                            value={escola}
                            onChange={(e) => {
                                setEscola(e.target.value)
                            }}
                        ></Input>
                    </InputGroup>
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
                        ></Input>
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
                        ></Input>
                    </InputGroup>
                    <Button type="submit" width="100%">
                        Registrar-me
                    </Button>
                </form>
                <span>
                    Ja estàs registrat?
                    <a href="/login">Inicia sessió</a>
                </span>
            </InputCard>
        </EntryPage>
    )
}
