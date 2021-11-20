
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// REDUX
import { isLoginSelector } from '../../app_state/login';
import { ROUTES } from '../../config/route';
import { GeneralHeader } from '../../com/app_layout/general_header';

function PrivateRoute({ children, ...rest }) {
    const isLogin = useSelector(isLoginSelector);
    // console.log(isLogin, '<PrivateRoute_isLogin>')
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin ?
                    <div>
                        <GeneralHeader />
                        {children}
                    </div> : (
                        <Redirect
                            to={{
                                pathname: `/${ROUTES.LOGIN}`,
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;

