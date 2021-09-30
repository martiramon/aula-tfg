import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
} from '@material-ui/core'
import { useHistory } from 'react-router'
import { EntryPage } from '../../app.styles'
import { routes } from '../../constants/routes'

import imStudent from '../../static/student.png'
import imTeacher from '../../static/teacher.png'

export const TriarAccesPage = () => {
    const history = useHistory()

    return (
        <>
            <EntryPage
                style={{
                    backgroundColor: '#f0f0f0',
                }}
            >
                <h1 style={{ marginTop: 50 }}>Benvingut/da a AULA</h1>
                <h3>Accedir com a:</h3>
                <div
                    style={{
                        width: 500,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <Card
                        style={{
                            maxWidth: 500,
                            minWidth: 150,
                            cursor: 'pointer',
                        }}
                    >
                        <CardActionArea
                            onClick={(event) => {
                                history.push(routes.loginAlumne.url)
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={imStudent}
                                alt="Alumne/a"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    align="center"
                                >
                                    Alumne/a
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card
                        style={{
                            maxWidth: 500,
                            minWidth: 150,
                            cursor: 'pointer',
                        }}
                    >
                        <CardActionArea
                            onClick={(event) => {
                                history.push(routes.aules.url)
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={imTeacher}
                                alt="Professor/a"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    align="center"
                                >
                                    Professor/a
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </EntryPage>
        </>
    )
}
