import { EntryPage, LogoHeader } from '../../app.styles'
import { Button, Input, InputCard, InputGroup } from '../../components'
export const SignupPage = () => {
    return (
        <EntryPage>
            <LogoHeader>AULA</LogoHeader>
            <InputCard>
                <h2>Registrar-se</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <InputGroup>
                        <label>Nom complet</label>
                        <Input
                            type="text"
                            placeholder="Martí Ramon Ros"
                        ></Input>
                    </InputGroup>
                    <InputGroup>
                        <label>Centre escolar</label>
                        <Input type="text" placeholder="El Montcau"></Input>
                    </InputGroup>
                    <InputGroup>
                        <label>Correu electrònic</label>
                        <Input type="text" placeholder="aula@aula.com"></Input>
                    </InputGroup>
                    <InputGroup>
                        <label>Contrasenya</label>
                        <Input type="password" placeholder="********"></Input>
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
