import React, { useState, useEffect } from 'react';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import { useToasts } from 'react-toast-notifications';
import { BreadcrumbBack } from 'components';

const Profile = props => {
	const { children, history } = props;
	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const breadcrumb = ['Twój profil', 'Edytuj'];
	const { addToast } = useToasts()
	const [data, setData] = useState([]);


	useEffect(() => {
		// assortment
		// 	.getInfo()
		// 	.then(response => {
		// 		if (response.code === 401) {
		// 			history.push('/login');
		// 		} else {
		// 			if (response.code === 200) {
		// 				setListInfo({ ...listInfo, unitList: response.data.unitList, measureUnitList: response.data.measureUnitList });
		// 			}
		// 		}
		// 	})
	}, []);

	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/assortment" />
		</>
	);
};

export default Profile;
