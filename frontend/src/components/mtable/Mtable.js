import MaterialTable from 'material-table'
import React from 'react'
import { forwardRef } from 'react'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

import { createMuiTheme } from '@material-ui/core/styles'
import { caES } from '@material-ui/core/locale'

const theme = createMuiTheme(
    {
        palette: {
            primary: { main: '#2f8bfd' },
        },
    },
    caES
)

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}
const Mtable = ({ data, onButtonClick, onDeleteClick }) => {
    const columns = [
        { title: 'Nom i cognoms', field: 'nom' },
        {
            title: 'Test respost?',
            field: 'resposta',
            type: 'boolean',
        },
    ]

    const actions = [
        {
            icon: DeleteIcon,
            tooltip: 'Eliminar alumne',
            onClick: (event, rowData) => {
                onDeleteClick(rowData)
            },
        },
        {
            icon: AddBox,
            tooltip: 'Afegir alumne',
            position: 'toolbar',
            onClick: onButtonClick,
        },
    ]

    return (
        <div>
            <MaterialTable
                icons={tableIcons}
                columns={columns}
                actions={actions}
                data={data}
                title={"Llistat d'alumnes"}
                options={{
                    pageSize: 8,
                    pageSizeOptions: [],
                }}
                localization={{
                    header: {
                        actions: 'Accions',
                    },
                    toolbar: {
                        searchPlaceholder: 'Cerca',
                        searchTooltip: 'Cerca',
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        firstTooltip: 'Primera Pàgina',
                        previousTooltip: 'Anterior',
                        nextTooltip: 'Següent',
                        lastTooltip: 'Última Pàgina',
                    },
                    body: {
                        emptyDataSourceMessage:
                            'Encara no hi ha alumnes en aquesta aula. Afegeix-ne mitjançant el botó + situat a la part superior dreta',
                    },
                }}
            ></MaterialTable>
        </div>
    )
}
export default Mtable
