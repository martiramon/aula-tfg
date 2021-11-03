import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { SideBtnLink, SideTitle } from '../sidebar/sidebarElements'
import SchoolIcon from '@material-ui/icons/School'
import AutorenewIcon from '@material-ui/icons/Autorenew'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: '19rem',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '19rem',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

export default function ClippedDrawer({ items, onAulaClick, onButtonClick }) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List>
                        <SideTitle justify-content="center">AULES</SideTitle>
                        {items ? (
                            items.map((aula) => (
                                <ListItem
                                    button
                                    key={aula._id}
                                    onClick={() => onAulaClick(aula)}
                                >
                                    {' '}
                                    <ListItemIcon>
                                        {' '}
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={aula.nom} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemIcon>
                                    {' '}
                                    <AutorenewIcon />
                                    <ListItemText primary={'Carregant...'} />
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                    <SideBtnLink onClick={() => onButtonClick()}>
                        Afegir aula
                    </SideBtnLink>
                </div>
            </Drawer>
        </div>
    )
}
