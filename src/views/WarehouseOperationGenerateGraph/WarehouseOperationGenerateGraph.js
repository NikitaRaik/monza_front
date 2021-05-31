import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, FullDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import warehouse_operation from 'apis/warehouse_operation';
import { useToasts } from 'react-toast-notifications';
import main from 'utils/main';

const WarehouseOperationGenerateGraph = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe', 'Generuj wykres'];
	const [data, setData] = useState({ date: null, assortment: [] });
	const [listInfo, setListInfo] = useState({ assortment: [], warehouse: [], unit: [], measure_unit: [], contractor: [] });

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

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_operation" />
			<FullDetail title="Generuj wykres">
				<React.Fragment>
					<FormInput title="Asortyment" name="assortment" type="several_single" value={data.assortment} handleChange={handleChange} list={listInfo.assortment} button_title="Dodaj asortyment do porównania" />
					<FormInput title="Magazyn" name="warehouse" type="single" value={data.warehouse} handleChange={handleChange} list={listInfo.warehouse} />
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<FormInput title="Data od" name="date_from" type="date" value={data.date_from} handleChange={handleChange} />
						</Grid>
						<Grid item xs={5}>
							<FormInput title="Data do" name="date_to" type="date" value={data.date_to} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<FormInput title="Wartościowo/Ilościowo" name="is_quantity" type="radio" value={data.is_quantity} handleChange={handleChange} />
						</Grid>
						<Grid item xs={5}>
							<FormInput title="Data do" name="date_to" type="date" value={data.date_to} handleChange={handleChange} />
						</Grid>
					</Grid>
				</React.Fragment>
			</FullDetail>
		</>
	);
};

export default WarehouseOperationGenerateGraph;
