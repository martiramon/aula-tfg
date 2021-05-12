import { Redirect, Route } from 'react-router-dom'
import { routes } from '../../constants/routes'
import { getToken } from '../../utils'

export const PrivateRoute = ({ children, path }) => {
    const isLogged = !!getToken()

    if (!isLogged) return <Redirect to={routes.login.url} />

    return <Route path={path}>{children}</Route>
}
