import react, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField } from '@material-ui/core'
import { Button } from '../button/Button'

export const Modal = ({
    showModal,
    setShowModal,
    handleSubmit,
    aula,
    errorModal,
}) => {
    const [nom, setNom] = useState('')

    const handleClose = () => {
        setShowModal(false)
    }
    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                {aula ? (
                    <div>
                        <DialogTitle id="form-dialog-title">
                            Afegir una nova aula
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                error={errorModal}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nom de l'aula"
                                type="string"
                                fullWidth
                                onChange={(e) => {
                                    setNom(e.target.value)
                                }}
                                helperText={
                                    errorModal ? 'Aula ja existent' : ''
                                }
                            />
                        </DialogContent>
                    </div>
                ) : (
                    <div>
                        <DialogTitle id="form-dialog-title">
                            Afegir un nou alumne
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                error={errorModal}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nom i cognoms"
                                type="string"
                                fullWidth
                                onChange={(e) => {
                                    setNom(e.target.value)
                                }}
                                helperText={
                                    errorModal ? 'Alumne ja existent' : ''
                                }
                            />
                        </DialogContent>
                    </div>
                )}

                <DialogActions>
                    <Button onClick={handleClose}>Cancel·lar</Button>
                    <Button onClick={() => handleSubmit(nom)}>Afegir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
