import React from "react";
import { withRouter } from "react-router";
import auth from './apis/auth';
import constants from './utils/constants';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { permission: false };
	}

	checkValidity() {
		if (constants.unauthenticated_url.indexOf(this.props.location.pathname) !== -1) {
			this.setState({ permission: 1 });
		} else {
			auth
				.validateToken()
				.then(response => {
					if (response.code !== 401) {
						this.setState({ permission: 1});
					}
					else {
						this.setState({ permission: 0});
						this.props.history.push('/login');
					}
				})
		}
	}

	componentDidMount() {
		this.checkValidity();
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.checkValidity();
		}
	}
	render() {
		return this.state.permission !== false &&
			React.cloneElement(this.props.children)
	}
}

export default AppContainer = withRouter(AppContainer);