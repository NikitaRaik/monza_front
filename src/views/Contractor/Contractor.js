import React, { useState, useEffect } from 'react';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';

import { Breadcrumb, ListViewController, PaginationController } from 'components';
import { SortTable } from './components';
import { useToasts } from 'react-toast-notifications';
import contractor from 'apis/contractor';
import { contractor_header } from 'utils/xlsx_headers';
import { ProgressBar } from 'components';
import main from 'utils/main';

const Contractor = props => {
	const { children, history } = props;

	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Grupy Magazynów'];

	const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
	const [searchOption, setSearchOption] = useState({name: '', code: '', GLN: '', supplier: 0, recipient: 0, active: 0});
	const [listInfo, setListInfo] = useState({
		active: [{id: 1, name: 'Nie'}, {id: 2, name: 'Tak'}],
		supplier: [{id: 1, name: 'Nie'}, {id: 2, name: 'Tak'}],
		recipient: [{id: 1, name: 'Nie'}, {id: 2, name: 'Tak'}]
	})
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [progressStatus, setProgressStatus] = useState(false);

	useEffect(() => {
		handleSearch();
	}, [sortOption, page]);

	useEffect(() => {
		handleSearch();
		setPage(1);
	}, [searchOption]);

	const handleCreate = () => {
		history.push('/contractor/create');
	}

	const handleImport = (rows) => {
		setProgressStatus(true);
		contractor
		.create_list(rows)
		.then(response => {
			if (response.code === 401) {
				history.push('/login');
			} else {
				if (response.code === 200) {
					addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
					handleSearch();
					setProgressStatus(false);
				}
			}
		})
	}

	const handleExport = () => {
		setProgressStatus(true);
		contractor
			.export()
			.then(response => {
				if (response.code === 401) {
					history.push('/login');
				} else {
					if (response.code === 200) {
						main.export(contractor_header, response.data);
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
		contractor
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
		contractor
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
				CreateTitle="Dodaj nowego kontrahenta"
				ImportTitle="Dodaj dane z pliku XLS"
				ExportTitle="Eksportuj listę do XLS"
				handleCreate={handleCreate}
				handleImport={handleImport}
				handleExport={handleExport}
				header_list={contractor_header}
			/>
			<Breadcrumb list={breadcrumb} parent_class={global_classes.breadcrumb_class} />
			<SortTable
				rows={data}
				requestSort={requestSort}
				sortOption={sortOption}
				searchOption={searchOption}
				setSearchOption={setSearchOption}
				listInfo={listInfo}
				handleDelete={handleDelete}
				handleChange={setData}
			/>
			{
				total !== 0 &&
				<PaginationController total={total} page={page} setPage={setPage} />
			}
			<ProgressBar progressStatus={progressStatus} />
		</>
	);
};

export default Contractor;
