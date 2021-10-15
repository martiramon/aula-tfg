import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
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
import {
    getAula,
    getAulaAlumne,
    getAulaAlumneCodi,
    getIdAlumne,
    getNomAlumne,
} from '../../utils'
import { getAlumnes } from '../aules/aulesPage.services'
import { getAlumnesCodiService } from '../loginAlumne/loginAlumePage.services'
import { getTestAula, postResposta } from './respondreTestPage.services'

export const RespondreTestPage = () => {
    const history = useHistory()
    const nomAl = getNomAlumne()
    const idAl = getIdAlumne()
    const aulaAl = getAulaAlumne()
    const codiaAulaAl = getAulaAlumneCodi()

    const [isBusy, setBusy] = useState(true)
    const [data, setData] = useState('')

    const [isBusyT, setBusyT] = useState(true)
    const [test, setTest] = useState('')

    const [alumne1, setAlumne1] = useState('')
    const [alumne2, setAlumne2] = useState('')
    const [alumne3, setAlumne3] = useState('')
    const [alumne4, setAlumne4] = useState('')
    const [alumne5, setAlumne5] = useState('')
    const [alumne6, setAlumne6] = useState('')
    const [alumne7, setAlumne7] = useState('')
    const [alumne8, setAlumne8] = useState('')
    const [alumne9, setAlumne9] = useState('')
    const [alumne10, setAlumne10] = useState('')

    const useStyles = makeStyles((theme) => ({
        formControl: {
            minWidth: 200,
        },
    }))

    const classes = useStyles()

    useEffect(() => {
        const omplirAlumnes = async () => {
            const response = await getAlumnesCodiService(codiaAulaAl)
            if (!response.error) {
                setData(
                    response.alumnes.sort(function (a, b) {
                        if (a.nom < b.nom) return -1
                        if (a.nom > b.nom) return 1
                        return 0
                    })
                )
                setBusy(false)
            } else {
                history.push(routes.loginAlumne.url)
            }
        }
        omplirAlumnes()
    }, [])

    useEffect(() => {
        const carregarTest = async () => {
            const response = await getTestAula(aulaAl)
            if (!response.error) {
                if (response.test) {
                    setTest(response.test)
                    setBusyT(false)
                } else {
                    history.push(routes.loginAlumne.url)
                }
            } else {
                history.push(routes.loginAlumne.url)
            }
        }
        carregarTest()
    }, [])

    const handleChange1 = (event) => {
        const alum = event.target.value
        setAlumne1(alum)
    }
    const handleChange2 = (event) => {
        const alum = event.target.value
        setAlumne2(alum)
    }
    const handleChange3 = (event) => {
        const alum = event.target.value
        setAlumne3(alum)
    }
    const handleChange4 = (event) => {
        const alum = event.target.value
        setAlumne4(alum)
    }
    const handleChange5 = (event) => {
        const alum = event.target.value
        setAlumne5(alum)
    }
    const handleChange6 = (event) => {
        const alum = event.target.value
        setAlumne6(alum)
    }
    const handleChange7 = (event) => {
        const alum = event.target.value
        setAlumne7(alum)
    }
    const handleChange8 = (event) => {
        const alum = event.target.value
        setAlumne8(alum)
    }
    const handleChange9 = (event) => {
        const alum = event.target.value
        setAlumne9(alum)
    }
    const handleChange10 = (event) => {
        const alum = event.target.value
        setAlumne10(alum)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var respostes = []
        respostes.push(
            alumne1,
            alumne2,
            alumne3,
            alumne4,
            alumne5,
            alumne6,
            alumne7,
            alumne8,
            alumne9,
            alumne10
        )
        const resp = await postResposta(idAl, test._id, respostes)
        handleClickOpen()
    }

    const [openD, setOpenD] = useState(false)
    const handleClickOpen = () => {
        setOpenD(true)
    }
    const handleClose = () => {
        setOpenD(false)
        localStorage.clear()
        sessionStorage.clear()
        history.push(routes.triarAcces.url)
    }

    return (
        <>
            {isBusyT ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                                }}
                            >
                                <h1>{nomAl}</h1>
                            </InputCard>
                        </EntryPage>
                    ) : (
                        <EntryPage
                            style={{
                                backgroundColor: '#f0f0f0',
                            }}
                        >
                            <h1>{nomAl}</h1>
                            <InputCard
                                style={{
                                    paddingTop: '14px',
                                    maxWidth: '900px',
                                }}
                            >
                                <h2>Respondre el Test</h2>
                                <form onSubmit={handleSubmit}>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 1:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[0].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2.5rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne1}
                                                onChange={handleChange1}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 2:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[1].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2.5rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne2}
                                                onChange={handleChange2}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 3:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[2].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne3}
                                                onChange={handleChange3}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 4:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[3].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne4}
                                                onChange={handleChange4}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 5:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[4].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne5}
                                                onChange={handleChange5}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 6:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[5].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne6}
                                                onChange={handleChange6}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 7:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[6].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne7}
                                                onChange={handleChange7}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 8:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[7].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne8}
                                                onChange={handleChange8}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 9:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[8].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne9}
                                                onChange={handleChange9}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup style={{ marginBottom: '0px' }}>
                                        <label
                                            style={{
                                                fontSize: '1.3rem',
                                                color: 'black',
                                            }}
                                        >
                                            Pregunta 10:
                                        </label>
                                        <label style={{ marginLeft: '1rem' }}>
                                            {test.preguntes[9].text}
                                        </label>
                                    </InputGroup>
                                    <InputGroup
                                        style={{ marginBottom: '2rem' }}
                                    >
                                        <FormControl
                                            required
                                            className={classes.formControl}
                                        >
                                            <InputLabel htmlFor="nomSelectLabel">
                                                Nom i cognoms
                                            </InputLabel>
                                            <Select
                                                required
                                                labelId="nomSelectLabel"
                                                label="Nom i cognoms"
                                                value={alumne10}
                                                onChange={handleChange10}
                                            >
                                                {data.map((alumne) => (
                                                    <MenuItem
                                                        key={alumne._id}
                                                        value={alumne}
                                                        disabled={
                                                            alumne.nom === nomAl
                                                        }
                                                    >
                                                        {alumne.nom}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputGroup>
                                    <Button
                                        type="submit"
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            paddingTop: '14px',
                                            marginTop: '1rem',
                                            width: '30%',
                                        }}
                                    >
                                        Enviar resposta
                                    </Button>
                                </form>
                            </InputCard>
                        </EntryPage>
                    )}
                </>
            )}
            <Dialog
                open={openD}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Test finalitzat'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Has finalitzat el test. Moltes gràcies! Això ajudarà a
                        millorar l'ambient de la classe.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        D'acord
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
