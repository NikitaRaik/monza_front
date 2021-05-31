import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid } from '@material-ui/core';
import { OutlineButton } from '..';
import readXlsxFile from 'read-excel-file'
import constants from 'utils/constants';

const useStyles = makeStyles(theme => ({

}));

const ListViewController = props => {
	const { CreateTitle, ImportTitle, ExportTitle, AddTitle, handleCreate, handleImport, handleExport, handleGenerate, header_list } = props;
	const input = document.getElementById('input');
	const { addToast } = useToasts()
	const classes = useStyles();

	const handleInputClick = () => {
		input.click();
	}

	useEffect(() => {
		if (input)
			input.addEventListener('change', () => {
				readXlsxFile(input.files[0]).then((rows) => {
					let header = rows[0];
					let result = [];
					if (header.length != header_list.length) {
						addToast(constants.WRONG_XLSX_HEADER, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
					else {
						let count = 0;

						header.map((item, index) => {
							if (item != header_list[index].header) {
								count++;
								console.log(item);
								console.log(header_list[index].header);
							}
						})

						if (count != 0) {
							addToast(constants.WRONG_XLSX_HEADER, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
						} else {
							rows.splice(0, 1);
							rows.map((row, index) => {
								let res_item = {};
								row.map((item, index) => {
									res_item = { ...res_item, [header_list[index].attr]: item };
								})
								result.push(res_item);
							})
							handleImport(result);
						}
					}
				});
			})
	}, [input])

	return (
		<Grid container spacing={3} justify="space-between">
			<Grid item style={{ display: 'flex' }}>
				<div style={{ marginRight: '20px' }}>
					<OutlineButton title={CreateTitle} onClick={handleCreate} />
				</div>
				{
					ImportTitle &&
					<div style={{ marginRight: '20px' }}>
						<OutlineButton title={ImportTitle} onClick={handleInputClick} />
						<input type="file" id="input" style={{ display: 'none' }} />
					</div>
				}
				{
					AddTitle &&
					<div>
						<OutlineButton title={AddTitle} onClick={handleGenerate} />
					</div>
				}

			</Grid>
			<Grid item>
				<OutlineButton title={ExportTitle} onClick={handleExport} />
			</Grid>
		</Grid>
	);
};

export default ListViewController;
