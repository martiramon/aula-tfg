import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
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
import { getAula } from '../../utils'
import { postTest } from './crearTestPage.services'

export const CrearTestPage = () => {
    const history = useHistory()
    const [pregunta1, setPregunta1] = useState(
        "Quin company/a t'agradaria que seiés al teu costat a la classe?"
    )
    const [pregunta1Pos, setPregunta1Pos] = useState('positiu')
    const [pregunta2, setPregunta2] = useState(
        "Quin company/a NO t'agradaria que seiés al teu costat a la classe?"
    )
    const [pregunta2Pos, setPregunta2Pos] = useState('negatiu')
    const [pregunta3, setPregunta3] = useState(
        "Amb quin company/a de classe t'agrada jugar a l'hora del pati?"
    )
    const [pregunta3Pos, setPregunta3Pos] = useState('positiu')
    const [pregunta4, setPregunta4] = useState(
        "Amb quin company/a de classe NO t'agrada gens jugar a l'hora del pati?"
    )
    const [pregunta4Pos, setPregunta4Pos] = useState('negatiu')
    const [pregunta5, setPregunta5] = useState(
        'Quin company/a de classe escolliries per fer els deures en parella?'
    )
    const [pregunta5Pos, setPregunta5Pos] = useState('positiu')
    const [pregunta6, setPregunta6] = useState(
        'Quin company/a de classe NO escolliries mai per fer els deures en parella?'
    )
    const [pregunta6Pos, setPregunta6Pos] = useState('negatiu')
    const [pregunta7, setPregunta7] = useState(
        "A quin company/a de classe convidaries a la teva festa d'aniversari"
    )
    const [pregunta7Pos, setPregunta7Pos] = useState('positiu')
    const [pregunta8, setPregunta8] = useState(
        "A quin company/a de classe NO convidaries a la teva festa d'aniversari"
    )
    const [pregunta8Pos, setPregunta8Pos] = useState('negatiu')
    const [pregunta9, setPregunta9] = useState(
        'Quin company/a de classe és el teu millor amic/amiga?'
    )
    const [pregunta9Pos, setPregunta9Pos] = useState('positiu')
    const [pregunta10, setPregunta10] = useState(
        'Quin company/a de classe et cau més malament?'
    )
    const [pregunta10Pos, setPregunta10Pos] = useState('negatiu')

    const aula = getAula()
    const handleSubmit = async (e) => {
        e.preventDefault()
        var textPreguntes = [
            pregunta1,
            pregunta2,
            pregunta3,
            pregunta4,
            pregunta5,
            pregunta6,
            pregunta7,
            pregunta8,
            pregunta9,
            pregunta10,
        ]
        var positiuPreguntes = [
            pregunta1Pos === 'positiu',
            pregunta2Pos === 'positiu',
            pregunta3Pos === 'positiu',
            pregunta4Pos === 'positiu',
            pregunta5Pos === 'positiu',
            pregunta6Pos === 'positiu',
            pregunta7Pos === 'positiu',
            pregunta8Pos === 'positiu',
            pregunta9Pos === 'positiu',
            pregunta10Pos === 'positiu',
        ]
        var preguntes = []
        for (var i = 0; i < 10; i++) {
            preguntes.push({
                text: textPreguntes[i],
                positiva: positiuPreguntes[i],
            })
        }
        console.log(aula)
        console.log(preguntes)
        const resp = await postTest(aula, preguntes)
        history.push(routes.aules.url)
        console.log(resp)
    }

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />)

    return (
        <>
            <Navbar />
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
                    <h1>Crear el Test Sociomètric</h1>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 1
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta1}
                                onChange={(e) => {
                                    setPregunta1(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu1"
                                    value={pregunta1Pos}
                                    onChange={(e) => {
                                        setPregunta1Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 2
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta2}
                                onChange={(e) => {
                                    setPregunta2(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu2"
                                    value={pregunta2Pos}
                                    onChange={(e) => {
                                        setPregunta2Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 3
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta3}
                                onChange={(e) => {
                                    setPregunta3(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu3"
                                    value={pregunta3Pos}
                                    onChange={(e) => {
                                        setPregunta3Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 4
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta4}
                                onChange={(e) => {
                                    setPregunta4(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu4"
                                    value={pregunta4Pos}
                                    onChange={(e) => {
                                        setPregunta4Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 5
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta5}
                                onChange={(e) => {
                                    setPregunta5(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu5"
                                    value={pregunta5Pos}
                                    onChange={(e) => {
                                        setPregunta5Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 6
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta6}
                                onChange={(e) => {
                                    setPregunta6(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu6"
                                    value={pregunta6Pos}
                                    onChange={(e) => {
                                        setPregunta6Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 7
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta7}
                                onChange={(e) => {
                                    setPregunta7(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu7"
                                    value={pregunta7Pos}
                                    onChange={(e) => {
                                        setPregunta7Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 8
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta8}
                                onChange={(e) => {
                                    setPregunta8(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu8"
                                    value={pregunta8Pos}
                                    onChange={(e) => {
                                        setPregunta8Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 9
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta9}
                                onChange={(e) => {
                                    setPregunta9(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu9"
                                    value={pregunta9Pos}
                                    onChange={(e) => {
                                        setPregunta9Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </InputGroup>
                        <InputGroup>
                            <label
                                style={{ fontSize: '1.3rem', color: 'black' }}
                            >
                                Pregunta 10
                            </label>
                            <Input
                                type="text"
                                required
                                value={pregunta10}
                                onChange={(e) => {
                                    setPregunta10(e.target.value)
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{
                                        paddingTop: '14px',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Interacció Positiva/Negativa
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="positiu10"
                                    value={pregunta10Pos}
                                    onChange={(e) => {
                                        setPregunta10Pos(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="positiu"
                                        control={<GreenRadio />}
                                        label="Positiva"
                                    />
                                    <FormControlLabel
                                        value="negatiu"
                                        control={<Radio />}
                                        label="Negativa"
                                    />
                                </RadioGroup>
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
                            Crear
                        </Button>
                    </form>
                </InputCard>
            </EntryPage>
        </>
    )
}
