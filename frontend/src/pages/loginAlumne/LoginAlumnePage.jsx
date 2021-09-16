import {
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import { DirectionsBikeTwoTone } from '@material-ui/icons'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { EntryPage, LogoHeader } from '../../app.styles'
import { InputAndBotton, InputCard, InputGroup } from '../../components'
import { routes } from '../../constants/routes'
import {
    setAulaAlumne,
    setAulaAlumneCodi,
    setEscola,
    setIdAlumne,
    setNom,
    setNomAlumne,
    setToken,
} from '../../utils'
import { getAlumnesCodiService } from './loginAlumePage.services'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
}))

export const LoginAlumePage = () => {
    const history = useHistory()
    const [codi, setCodi] = useState('')
    const [codiOk, setCodiOk] = useState(false)
    const [errorCodi, setErrorCodi] = useState(false)
    const [alumneAct, setAlumneAct] = useState('')
    const [alumnes, setAlumnes] = useState('')

    const classes = useStyles()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setNomAlumne(alumneAct.nom)
        setIdAlumne(alumneAct._id)
        setAulaAlumne(alumneAct.aula)
        setAulaAlumneCodi(codi)
        history.push(routes.respondreTest.url)
    }

    const handleSubmitCodi = async (e) => {
        e.preventDefault()
        const resp = await getAlumnesCodiService(codi)
        if (!resp.error) {
            setAlumnes(resp)
            setErrorCodi(false)
            setCodiOk(true)
        } else {
            setErrorCodi(true)
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        const alum = event.target.value
        setAlumneAct(alum)
    }

    return (
        <EntryPage>
            <LogoHeader>AULA</LogoHeader>
            <InputCard>
                <h2>Accedir com a alumne</h2>
                <form onSubmit={handleSubmitCodi}>
                    <InputAndBotton>
                        <TextField
                            id="inputCodi"
                            error={errorCodi === true}
                            helperText={
                                errorCodi === true
                                    ? "Codi d'aula incorrecte"
                                    : ''
                            }
                            variant="outlined"
                            placeholder="aZq4s"
                            fullWidth
                            label="Codi de l'aula"
                            disabled={codiOk === true}
                            value={codi}
                            onChange={(e) => {
                                setCodi(e.target.value)
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="medium"
                            disabled={codiOk === true || codi === ''}
                        >
                            Validar
                        </Button>
                    </InputAndBotton>
                </form>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        className={classes.formControl}
                        style={{ textAlign: 'left' }}
                        variant="outlined"
                    >
                        <InputLabel id="nomSelectLabel">
                            Nom i Cognoms
                        </InputLabel>
                        <Select
                            disabled={codiOk === false}
                            labelId="nomSelectLabel"
                            label="Nom i cognoms"
                            value={alumneAct}
                            onChange={handleChange}
                        >
                            {codiOk
                                ? alumnes.alumnes.map((alumne) => (
                                      <MenuItem
                                          key={alumne._id}
                                          value={alumne}
                                          disabled={alumne.resposta}
                                      >
                                          {alumne.nom}
                                      </MenuItem>
                                  ))
                                : ''}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        width="100%"
                        size="large"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={alumneAct === ''}
                        style={{ paddingTop: '14px', marginTop: '1rem' }}
                    >
                        Accedir
                    </Button>
                </form>
            </InputCard>
        </EntryPage>
    )
}
