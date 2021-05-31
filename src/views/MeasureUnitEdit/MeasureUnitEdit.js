import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import measurement_unit from 'apis/measurement_unit';

const MeasureUnitEdit = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Jednostki miary', 'Dodaj nowy/Edytuj'];
	const id = props.match.params.id;

	const [data, setData] = useState({});

	useEffect(() => {
		measurement_unit.get(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					setData(response.data);
				}
			})
	}, []);

	const handleSave = () => {
		measurement_unit
			.update(data, id)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login') }, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/measure_unit') }, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleDelete = () => {
		measurement_unit
			.delete(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/measure_unit') }, 1000);
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/measure_unit" />
			<SingleDetail title="Dane dotyczące jednostki" type="edit" handleSave={handleSave} handleDelete={handleDelete}>
				<React.Fragment>
					<FormInput title="Nazwa jednostki" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default MeasureUnitEdit;
