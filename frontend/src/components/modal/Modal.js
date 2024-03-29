import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField } from '@material-ui/core'
import { Button } from '../button/Button'
import { ButtonRed } from '../button/ButtonRed'

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
                    <ButtonRed onClick={handleClose}>Cancel·lar</ButtonRed>
                    <Button onClick={() => handleSubmit(nom)}>Afegir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
