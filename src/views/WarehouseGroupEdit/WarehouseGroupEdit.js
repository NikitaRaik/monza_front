import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import warehousegroup from 'apis/warehousegroup';

const WarehouseGroupEdit = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Grupy magazynów', 'Dodaj nowy/Edytuj'];
	const id = props.match.params.id;

	const [data, setData] = useState({ warehouses: [] });
	const [listInfo, setListInfo] = useState({ warehouse_list: [] })

	useEffect(() => {
		warehousegroup
			.getInfo()
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						setListInfo(response.data);
					}
				}
			})
	}, []);

	useEffect(() => {
		warehousegroup
			.get(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						setData(response.data);
					}
				}
			})
	}, [listInfo]);

	const handleSave = () => {
		warehousegroup
			.update(data, id)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login') }, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/warehouse_group') }, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleDelete = () => {
		warehousegroup
			.delete(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/warehouse_group') }, 1000);
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}
	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_group" />
			<SingleDetail title="Dane dotyczące grupy magazynów" type="edit" handleSave={handleSave} handleDelete={handleDelete}>
				<React.Fragment>
					<FormInput title="Nazwa grupy" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Przynależne magazyny" name="warehouses" type="several_single" value={data.warehouses} handleChange={handleChange} list={listInfo.warehouse_list} button_title="Dodaj kolejny magazyn" />
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<FormInput title="Przyjęcie" name="received" type="number" value={data.received} handleChange={handleChange} />
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInput title="Wydanie" name="releases" type="number" value={data.releases} handleChange={handleChange} />
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInput title="Zapas" name="supply" type="number" value={data.supply} handleChange={handleChange} />
						</Grid>
						<Grid item xs={12} md={6} style={{ paddingTop: '27px' }}>
							<FormInput title="Aktywny" name="active" type="check_box" value={data.active} handleChange={handleChange} />
						</Grid>
					</Grid>
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default WarehouseGroupEdit;
