import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import warehouse from 'apis/warehouse';
import { useToasts } from 'react-toast-notifications';

const WarehouseCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Magazyny', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({});

	const handleSave = () => {
		warehouse
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login')}, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/warehouse')}, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}
	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse" />
			<SingleDetail title="Dane dotyczące magazynu" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Nazwa magazynu" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
					<FormInput title="Aktywny" name="active" type="check_box" value={data.active} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default WarehouseCreate;
