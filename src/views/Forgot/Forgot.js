import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Button,
	Link,
	Typography
} from '@material-ui/core';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import { ProgressBar } from 'components';
import auth from '../../apis/auth';
import constants from '../../utils/constants';
import clsx from 'clsx';
import { useToasts } from 'react-toast-notifications';

const Forgot = props => {
	const { history } = props;

	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const [input, setInput] = useState({});
	const [error, setError] = useState({});

	const [hasAlert, setHasAlert] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [message, setMessage] = useState('');
	const [progressStatus, setProgressStatus] = useState(false);
	const { addToast } = useToasts()

	useEffect(() => {

	}, []);

	const handleChange = event => {
		let arr = JSON.parse(JSON.stringify(input));
		arr[event.target.name] = event.target.value;
		setInput(arr);
	};

	const handleForgot = event => {
		if ((error && (error.email && error.email.length > 0)) || !input.email) {
			addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
		} else {
			setProgressStatus(true);
			auth
				.forgot(input.email)
				.then(response => {
					if (response.code === 200) {
						setProgressStatus(false);
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/login') }, 1000);
					} else {
						setProgressStatus(false);
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				})
		}
	};

	const handleKeyPress = (event) => {
		if (event.charCode === 13) {
			handleForgot();
		}
	}

	useEffect(() => {
		let arr = JSON.parse(JSON.stringify(error));
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		if (input["email"] && !pattern.test(input["email"])) {
			arr["email"] = constants.ENTER_VALID_EMAIL;
		} else {
			arr["email"] = "";
		}

		setError(arr);
	}, [input]);
	return (
		<>
			<div className={classes.root}>
				<div className={classes.loginForm}>
					<Typography variant={"h2"} className={clsx(classes.description, global_classes.normal_font)}>
						Podaj swój adres e-mail, aby odzyskać hasło
					</Typography>
					<div className={classes.form}>
						<div className={classes.input_box_label}><label htmlFor="email">E-mail</label></div>
						<input className={classes.input_box} aria-label="e-mail" type="email" value={input.email} name="email" id="email" onChange={handleChange} onKeyPress={handleKeyPress} />
						<div className={classes.error_log}>{error["email"] && error["email"].length > 0 && error.email}</div>
						<div className={classes.buttonContainer}>
							<Button variant="outlined" className={clsx(classes.btnForgot, global_classes.outline_button)} onClick={handleForgot}>
								Wyślij
							</Button>
							<Link to="/login" component={RouterLink} className={classes.btnBack}>
								Wróć do poprzedniej strony
							</Link>
						</div>
					</div>

				</div>
			</div>
			<ProgressBar progressStatus={progressStatus} />
		</>
	);
};

Forgot.propTypes = {
	history: PropTypes.object
};

export default withRouter(Forgot);
