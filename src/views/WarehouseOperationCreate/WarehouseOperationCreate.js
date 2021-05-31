import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import warehouse_operation from 'apis/warehouse_operation';
import { useToasts } from 'react-toast-notifications';
import main from 'utils/main';

const WarehouseOperationCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({ date: null });
	const [listInfo, setListInfo] = useState({ assortment: [], warehouse: [], unit: [], measure_unit: [], contractor: []});

	useEffect(() => {
		warehouse_operation
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
		let purchase_price = main.getAttrFromArray(listInfo.assortment, data.assortment, 'purchase_price', '');
		let sale_price = main.getAttrFromArray(listInfo.assortment, data.assortment, 'sale_price', '');
		let calculated_received_value = main.round(main.convertStrToNum(purchase_price) * main.convertStrToNum(data.receipt_value), 2);
		let calculated_releases_value = main.round(main.convertStrToNum(sale_price) * main.convertStrToNum(data.issue_amount), 2);
		let stock_value = main.round(main.convertStrToNum(purchase_price) * main.convertStrToNum(data.inventory), 2);
		let order_value = main.round(main.convertStrToNum(sale_price) * main.convertStrToNum(data.order_quantity), 2);
		setData({
			...data,
			'purchase_price': purchase_price, 
			'sale_price': sale_price,
			'calculated_received_value': main.convertNumToStr(calculated_received_value),
			'calculated_releases_value': main.convertNumToStr(calculated_releases_value),
			'stock_value': main.convertNumToStr(stock_value),
			'order_value': main.convertNumToStr(order_value)
		})
	}, [data.assortment, data.receipt_value, data.reception_frequency, data.issue_amount, data.release_frequency, data.inventory, data.order_quantity])
	const handleSave = () => {
		warehouse_operation
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					setTimeout(function () { history.push('/login') }, 3000);
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push('/warehouse_operation') }, 1000);
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
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_operation" />
			<SingleDetail title="Dane dotyczące operacje" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Asortyment" name="assortment" type="single" value={data.assortment} list={listInfo.assortment} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Cena zakupu" name="purchase_price" type="input" value={data.purchase_price} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Cena sprzedaży" name="sale_price" type="input" value={data.sale_price} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Data" name="date" type="date" value={data.date} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Magazyn" name="warehouse" type="single" value={data.warehouse} list={listInfo.warehouse} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Jednostka miary" name="unit" type="single" value={data.unit} list={listInfo.unit} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Jednostka logistyczna" name="measure_unit" type="single" value={data.measure_unit} list={listInfo.measure_unit} handleChange={handleChange} />
						</Grid>
					</Grid>
					<FormInput title="Kontrahent" name="contractor" type="single" value={data.contractor} list={listInfo.contractor} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wielkość przyjęć [jedn. m.] [jedn. log.]" name="receipt_value" type="number" value={data.receipt_value} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wielkość wydań [jedn. m.] [jedn. log.]" name="issue_amount" type="number" value={data.issue_amount} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Częstotliwość przyjęć [-]" name="reception_frequency" type="number" value={data.reception_frequency} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Częstotliwość wydań [-] " name="release_frequency" type="number" value={data.release_frequency} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wartość przyjęć [PLN]" name="calculated_received_value" type="input" value={data.calculated_received_value} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wartość wydań [PLN]" name="calculated_releases_value" type="input" value={data.calculated_releases_value} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Zapas [jedn. m.] [jedn. log.]" name="inventory" type="number" value={data.inventory} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wielkość zamówienia [jedn. m.] [jedn. log.]" name="order_quantity" type="number" value={data.order_quantity} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wartość zapasu [PLN]" name="stock_value" type="input" value={data.stock_value} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wartość zamówienia [PLN] " name="order_value" type="input" value={data.order_value} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default WarehouseOperationCreate;
