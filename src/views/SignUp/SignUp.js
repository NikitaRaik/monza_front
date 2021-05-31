import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Link, Typography
} from '@material-ui/core';
import {
  ProgressBar
} from 'components';
import useStyles from './style';
import auth from '../../apis/auth';
import constants from '../../utils/constants';
import useGlobalStyles from 'assets/style/styles';
import clsx from 'clsx';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useToasts } from 'react-toast-notifications';

const SignUp = props => {
  const classes = useStyles();
  const global_classes = useGlobalStyles();
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
	const [tryLogin, setTryLogin] = useState(false);
  const { addToast } = useToasts()

  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(error));
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (input["email"] && !pattern.test(input["email"])) {
      arr["email"] = constants.ENTER_VALID_EMAIL;
    } else {
      arr["email"] = "";
    }
    var pass_pattern = new RegExp(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);
    if (!pass_pattern.test(input["password"])) {
      arr["password"] = constants.ENTER_SPEC_PASSWORD;
    } else {
      arr["password"] = "";
    }
    let reset_password = input["reset_password"];
    let password = input["password"];
    if (input["reset_password"] && reset_password !== password) {
      arr["reset_password"] = constants.ENTER_SAME_PASSWORD;
    } else {
      arr["reset_password"] = "";
    }

    setError(arr);
  }, [input]);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

  const handleSignUp = event => {
    setTryLogin(true);
    if ((error && ((error.email && error.email.length > 0) || (error.password && error.password.length > 0) || (error.reset_password && error.reset_password.length > 0)))
      || !input.email || !input.password || !input.reset_password) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
      setProgressStatus(true);
      auth
        .register(input.email, input.password)
        .then(response => {
          if (response.code === 200) {
            addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
          } else {
            addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
          }
          setProgressStatus(false);
        })
    }
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSignUp();
    }
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.loginForm}>
          <Typography variant={"h2"} className={clsx(classes.description, global_classes.normal_font)}>
            Podaj swój adres e-mail oraz dwukrotnie wprowadź swoje hasło.
					</Typography>
          <Typography variant={"h2"} className={clsx(classes.description, global_classes.normal_font)}>
            W celu weryfikacji konta otrzymasz potwierdzenie na podany adres e-mail.
					</Typography>
          <div className={classes.form}>
            <div className={classes.input_box_label}><label htmlFor="email">E-mail</label></div>
            <input className={classes.input_box} type="email" value={input.email} name="email" placeholder="E-mail" onChange={handleChange} onKeyPress={handleKeyPress} />
            <div className={classes.error_log}>{tryLogin && error["email"] && error["email"].length > 0 && error.email}</div>
            <div className={classes.input_box_label}><label htmlFor="password">Hasło</label></div>
            <input className={classes.input_box} type="password" value={input.password} name="password" placeholder="Hasło" onChange={handleChange} onKeyPress={handleKeyPress} />
            <div className={classes.error_log}>{tryLogin && error["password"] && error["password"].length > 0 && error.password}</div>
            <div className={classes.input_box_label}><label htmlFor="password">Powtórz hasło</label></div>
            <input className={classes.input_box} type="password" value={input.reset_password} name="reset_password" placeholder="Powtórz hasło" onChange={handleChange} onKeyPress={handleKeyPress} />
            <div className={classes.error_log}>{tryLogin && error["reset_password"] && error["reset_password"].length > 0 && error.reset_password}</div>
            <div className={classes.buttonContainer}>
              <Button variant="outlined" className={clsx(classes.btnLogin, global_classes.outline_button)} onClick={handleSignUp}>
                Zarejestruj się
              </Button>
              <Link to="/login" component={RouterLink} className={classes.btnRegister}>Mam konto - zaloguj się<ArrowRightAltIcon className={classes.arrow}/></Link>
            </div>
          </div>
        </div>
      </div>
      <ProgressBar progressStatus={progressStatus} />
    </>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
