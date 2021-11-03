import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
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
