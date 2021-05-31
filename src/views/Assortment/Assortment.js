import React, { useState, useEffect } from 'react';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import { useToasts } from 'react-toast-notifications';
import { SortTable } from './components';
import { Breadcrumb, ListViewController, PaginationController } from 'components';
import assortment from 'apis/assortment';
import { assortment_header } from 'utils/xlsx_headers';
import { ProgressBar } from 'components';
import main from 'utils/main';

const Assortment = props => {
	const { children, history } = props;
	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Asortyment'];
	const { addToast } = useToasts()

	const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
	const [searchOption, setSearchOption] = useState({ name: '', index: '', gtin: '', unit: 0, measure_unit: 0, active: 0, to_order: 0 });
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [listInfo, setListInfo] = useState({
		unitList: [],
		measureUnitList: [],
		active: [{ id: 1, name: 'Nie' }, { id: 2, name: 'Tak' }],
		to_order: [{ id: 1, name: 'Nie' }, { id: 2, name: 'Tak' }],
	})
	const [progressStatus, setProgressStatus] = useState(false);

	useEffect(() => {
		assortment
			.getInfo()
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						setListInfo({ ...listInfo, unitList: response.data.unitList, measureUnitList: response.data.measureUnitList });
					}
				}
			})
	}, []);

	useEffect(() => {
		handleSearch();
	}, [sortOption, page]);

	useEffect(() => {
		handleSearch();
		setPage(1);
	}, [searchOption]);

	const handleCreate = () => {
		history.push('/assortment/create');
	}

	const handleImport = (rows) => {
		setProgressStatus(true);
		assortment
			.create_list(rows)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						handleSearch();
					}
					setProgressStatus(false);
				}
			})
	}

	const handleExport = () => {
		setProgressStatus(true);
		assortment
			.export()
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						main.export(assortment_header, response.data);
					}
					setProgressStatus(false);
				}
			})
	}


	const requestSort = (pSortBy) => {
		let sortOrder = "asc";
		if (pSortBy === sortOption.sortBy) {
			sortOrder = (sortOption.sortOrder === "asc" ? "desc" : "asc");
		}
		setSortOption({ sortBy: pSortBy, sortOrder: sortOrder })
	}

	const handleDelete = (index) => {
		assortment
			.delete(index)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
					}
					handleSearch();
					setPage(1);
				}
			})
	}

	const handleSearch = () => {
		assortment
			.getListByOption(sortOption, 25, page, searchOption)
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						setData(response.data.list);
						setTotal(response.data.count);
					}
				}
			})
	}

	return (
		<>
			<ListViewController
				CreateTitle="Dodaj nowy asortyment"
				ImportTitle="Dodaj dane z pliku XLS"
				ExportTitle="Eksportuj listę do XLS"
				handleCreate={handleCreate}
				handleImport={handleImport}
				handleExport={handleExport}
				header_list={assortment_header}
			/>
			<Breadcrumb list={breadcrumb} parent_class={global_classes.breadcrumb_class} />
			<SortTable
				rows={data}
				requestSort={requestSort}
				sortOption={sortOption}
				searchOption={searchOption}
				setSearchOption={setSearchOption}
				handleDelete={handleDelete}
				handleChange={setData}
				listInfo={listInfo}
			/>
			{
				total !== 0 &&
				<PaginationController total={total} page={page} setPage={setPage} />
			}
			<ProgressBar progressStatus={progressStatus} />
		</>
	);
};

export default Assortment;
