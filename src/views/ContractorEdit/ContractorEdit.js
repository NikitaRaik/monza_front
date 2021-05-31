import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import contractor from 'apis/contractor';
import { useToasts } from 'react-toast-notifications';

const ContractorEdit = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Magazyny', 'Dodaj nowy/Edytuj'];
	const id = props.match.params.id;

	const [data, setData] = useState({});
	const [error, setError] = useState({postal_code: false})

	const handleValidate = () => {
		if (!data.postal_code || !data.postal_code.match(/^[0-9][0-9]-[0-9][0-9][0-9]$/)) {
			setData({ ...data, ['postal_code']: ''});
			setError({...error, ['postal_code']: true});
			return false;
		} else {
			setError({...error, ['postal_code']: false});
			return true;
		}
	}

	useEffect(() => {
		contractor.get(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					setData(response.data);
				}
			})
	}, []);

	const handleSave = () => {
		if (!handleValidate()) {
			addToast('Wprowadzono błędny kod pocztowy', { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })			
		} else 
		contractor
			.update(data, id)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login') }, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/contractor') }, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleDelete = () => {
		contractor
			.delete(id)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/contractor') }, 1000);
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}
	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/contractor" />
			<SingleDetail title="Dane dotyczące kontrahenta" type="edit" handleSave={handleSave} handleDelete={handleDelete}>
				<React.Fragment>
					<FormInput title="Nazwa kontrahenta" name="name" type="input" value={data.name} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Kod" name="code" type="input" value={data.code} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="GLN" name="GLN" type="input" value={data.GLN} handleChange={handleChange} />
						</Grid>
					</Grid>
					<FormInput title="Aktywny" name="active" type="check_box" value={data.active} handleChange={handleChange} />
					<FormInput title="Dostawca" name="supplier" type="check_box" value={data.supplier} handleChange={handleChange} />
					<FormInput title="Odbiorca" name="recipient" type="check_box" value={data.recipient} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<FormInput title="Ulica, numer budynku i lokalu" name="address" type="input" value={data.address} handleChange={handleChange} />
						</Grid>
						<Grid item xs={3}>
							<FormInput title="Kod pocztowy" name="postal_code" type="postal_code" value={data.postal_code} error={error.postal_code} handleChange={handleChange} />
						</Grid>
						<Grid item xs={4}>
							<FormInput title="Miejscowość" name="city" type="input" value={data.city} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Czas realizacji zamówienia [dni]" name="order_fulfillment_time" type="number" value={data.order_fulfillment_time} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Odchylenie czasu realizacji [dni]" name="delivery_time_deviation" type="number" value={data.delivery_time_deviation} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Minimalna wielkość zamówienia" name="minimum_order_quantity" type="number" value={data.minimum_order_quantity} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Minimalna wartość zamówienia [PLN] " name="minimum_order_value" type="number" value={data.minimum_order_value} handleChange={handleChange} />
						</Grid>
					</Grid>
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
					<FormInput title="Dostawca pokrywa koszt transportu" name="supplier_transport" type="check_box" value={data.supplier_transport} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default ContractorEdit;
