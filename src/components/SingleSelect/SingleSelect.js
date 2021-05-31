import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { Alert } from 'components';

const SingleSelect = (props) => {
  const classes = useStyles();
  const { value, handleChange, list, error, disabled, id} = props;
  useEffect(() => {
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl} error={error} disabled={disabled}>
      <Select
        native 
        value={value}
        onChange={(event) =>handleChange(event.target.value ? event.target.value : {})}
        inputProps={{
          name: 'age',
          id: id
        }}
        className={classes.input_box}
				aria-label="Wybierz opcję"
      >
        <option aria-label="Wybierz opcję" value={0}>Wybierz opcję</option>
        {
          list.map((item, index) => 
            <option key={index} value={item.id}>{item.name}</option>
          )
        }
      </Select>
    </FormControl>
  );
};

export default withRouter(SingleSelect);
