import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from '../../constants/routes'
import { PrivateRoute } from './PrivateRoute'

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {Object.entries(routes).map(([key, value]) => {
                    const Page = value.component
                    if (value.private)
                        return (
                            <PrivateRoute path={value.url} key={key}>
                                <Page />
                            </PrivateRoute>
                        )
                    return (
                        <Route path={value.url} key={key}>
                            <Page />
                        </Route>
                    )
                })}
            </Switch>
        </BrowserRouter>
    )
}
