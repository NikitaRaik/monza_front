import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import assortment from 'apis/assortment';
import { useToasts } from 'react-toast-notifications';

const AssortmentCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Asortyment', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({});
	const [listInfo, setListInfo] = useState({ unitList: [], measureUnitList: [], assortmentGroup: []});

	useEffect(() => {
		assortment
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

	const handleSave = () => {
		assortment
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login') }, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/assortment') }, 1000);
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
			<BreadcrumbBack list={breadcrumb} back_url="/assortment" />
			<SingleDetail title="Dane dotyczące asortymentu" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Nazwa asortymentu" name="name" type="input" value={data.name} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Indeks" name="index" type="input" value={data.index} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="GTIN" name="gtin" type="input" value={data.gtin} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Jednostka han." name="unit" type="single" value={data.unit} list={listInfo.unitList} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Jednostka log." name="measure_unit" type="single" value={data.measure_unit} list={listInfo.measureUnitList} handleChange={handleChange} />
						</Grid>
					</Grid>
					<FormInput title="Aktywny" name="active" type="check_box" value={data.active} handleChange={handleChange} />
					<FormInput title="Na zamówienie" name="to_order" type="check_box" value={data.to_order} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Cena zakupu [PLN]" name="purchase_price" type="number" value={data.purchase_price} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Cena sprzedaży [PLN]" name="sale_price" type="number" value={data.sale_price} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Grupa asortymentowa" name="assortment_group" type="single" value={data.assortment_group} list={listInfo.assortmentGroup} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Typ asortymentu" name="assortment_type" type="input" value={data.assortment_type} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Prawdopodobieństwo Obsługi popytu [%]" name="service_demand" type="number" value={data.service_demand} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Czas cyklu uzupełniania [dni]" name="refill_cycle_time" type="number" value={data.refill_cycle_time} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Odchylenie czasu cyklu uzupełnienia [dni]" name="cycle_time_deviations" type="number" value={data.cycle_time_deviations} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Współczynnik kosztu utrzymania zapasu [-]" name="inventory_cost_factor" type="number" value={data.inventory_cost_factor} handleChange={handleChange} />
						</Grid>
					</Grid>
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default AssortmentCreate;
