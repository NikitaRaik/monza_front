import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { ProgressBar } from 'components';
import auth from '../../apis/auth';
import { useToasts } from 'react-toast-notifications';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ValidateUser = props => {
  const { history } = props;
  let query = useQuery();
  let token = query.get("token");
  
  const [progressStatus, setProgressStatus] = useState(false);
  const { addToast } = useToasts()

  useEffect(() => {
    setProgressStatus(true);
    auth
      .validate(token)
      .then(response => {
        if (response.code === 200) {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
          setTimeout(function () { history.push('/login'); }, 1000);
        } else {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
          setTimeout(function () { history.push('/login'); }, 3000);
        }
      })
  }, []);

  return (
    <>
      <ProgressBar progressStatus={progressStatus} />
    </>
  );
};

ValidateUser.propTypes = {
  history: PropTypes.object
};

export default withRouter(ValidateUser);
