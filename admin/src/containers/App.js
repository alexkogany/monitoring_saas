import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { NotificationContainer } from "Components/ReactNotifications";
import { defaultStartPath } from 'Constants/defaultValues'


import AppLocale from '../lang';
import MainRoute from 'Routes';
import login from 'Routes/login'
import register from 'Routes/register'
import error from 'Routes/error'
import forgotPassword from 'Routes/forgot-password'

import 'Assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'Assets/css/sass/themes/gogo.light.purple.scss';
/*
color options : 
	 'light.purple'		'dark.purple'
	 'light.blue'		'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		'dark.red'
*/


const InitialPath = ({ component: Component,  authUser,...rest }) =>(
	<Route
		{...rest}
		render={props =>
			authUser 
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
		/>}
	/>
);

class App extends Component {
	/*constructor(props) {
		super(props);
		this.state = {date: new Date()};


	}*/

	render() {

		
		const { location, match, user, locale } = this.props;

		//notify.success('Login Success');
		//console.log("===========START read props =============");
		//console.log(this.props);
		//console.log("============END read props ============")

		//console.log("===========START print =============");
		//console.log(user);
		//console.log(match);
		//console.log("============END print ============")
		//console.log(InitialPath);

		//alert(user);

		const currentAppLocale = AppLocale[locale];
		if (location.pathname === '/'  || location.pathname==='/app'|| location.pathname==='/app/') {
			return (<Redirect to={defaultStartPath} />);
		}
		return (
				<Fragment>
					<NotificationContainer />
					<IntlProvider
						locale={currentAppLocale.locale}
						messages={currentAppLocale.messages}
					>
						<Fragment>
						<Switch>
							<InitialPath
								path={`${match.url}app`}
								//authUser={user}
								authUser={sessionStorage.getItem("user_id")}
								component={MainRoute}
							/>
							<Route path={`/login`} component={login} />
							<Route path={`/register`} component={register} />
							<Route path={`/forgot-password`} component={forgotPassword} />
							<Route path={`/error`} component={error} />
							<Redirect to="/error" />
						</Switch>
						</Fragment>
					</IntlProvider>
				</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {	
	const { user } = authUser;
	const { locale } = settings;
	return { user, locale };
};

export default connect(mapStateToProps,{  })(App);

