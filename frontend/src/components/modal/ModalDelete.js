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
import { ButtonRed } from '../button/ButtonRed'

export const ModalDelete = ({
    showModal,
    setShowModal,
    handleSubmit,
    alumne,
}) => {
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
                {alumne ? (
                    <div>
                        <DialogTitle id="form-dialog-title">
                            Estàs segur que vols eliminar aquest alumne?
                        </DialogTitle>
                    </div>
                ) : (
                    <div>
                        <DialogTitle id="form-dialog-title">
                            Estàs segur que vols eliminar aquesta aula, el seu
                            test i tots els seus alumnes?
                        </DialogTitle>
                    </div>
                )}

                <DialogActions>
                    <Button onClick={handleClose}>Cancel·lar</Button>
                    <ButtonRed onClick={() => handleSubmit()}>
                        Eliminar
                    </ButtonRed>
                </DialogActions>
            </Dialog>
        </>
    )
}
