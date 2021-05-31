import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  Card,
  TextareaAutosize,
  Typography,
  Grid
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { DeleteModal, SingleSelect } from 'components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';

const SortTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { rows, sortOption, requestSort, searchOption, setSearchOption, handleDelete, handleChange, listInfo } = props;
  const global_classes = useGlobalStyles();

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleSelectedItem = (id) => {
    setSelectedItem(id);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handlePreview = (indx_main) => {
    let _rows = JSON.parse(JSON.stringify(rows));

    _rows[indx_main].preview = !_rows[indx_main].preview;
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push(`/assortment/edit/${id}`)
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 0}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(0)}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 1}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(1)}
              >
                Nazwa
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 2}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(2)}
              >
                Indeks
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
              >
                GTIN
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 4}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(4)}
              >
                <div>
                  <div>
                    Jednostka
                </div>
                  <div>
                    handlowa
                  </div>
                </div>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 5}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(5)}
              >
                <div>
                  <div>
                    Jednostka
                  </div>
                  <div>
                    log.
                  </div>
                </div>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 6}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(6)}
              >
                Aktywny
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 7}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(7)}
              >
                Na zamów.
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel align="right">
                Akcje
            </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.name} onChange={(e) => setSearchOption({ ...searchOption, name: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.index} onChange={(e) => setSearchOption({ ...searchOption, index: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.gtin} onChange={(e) => setSearchOption({ ...searchOption, gtin: e.target.value })} />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.unit}
                handleChange={(value) => setSearchOption({ ...searchOption, unit: value })}
                list={listInfo.unitList}
              />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.measure_unit}
                handleChange={(value) => setSearchOption({ ...searchOption, measure_unit: value })}
                list={listInfo.measureUnitList}
              />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.active}
                handleChange={(value) => setSearchOption({ ...searchOption, active: value })}
                list={listInfo.active}
              />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.to_order}
                handleChange={(value) => setSearchOption({ ...searchOption, to_order: value })}
                list={listInfo.to_order}
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((item, indx) => (
            <>
              <TableRow key={indx} className={global_classes.root}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.index}</TableCell>
                <TableCell>{item.gtin}</TableCell>
                <TableCell>{item.unit_name}</TableCell>
                <TableCell>{item.measure_unit_name}</TableCell>
                <TableCell >
                  {item.active === 1 ?
                    <CheckIcon fontSize="small" className={classes.check_icon} />
                    :
                    <CloseIcon fontSize="small" className={classes.close_icon} />
                  }
                </TableCell>
                <TableCell >
                  {item.to_order === 1 ?
                    <CheckIcon fontSize="small" className={classes.check_icon} />
                    :
                    <CloseIcon fontSize="small" className={classes.close_icon} />
                  }
                </TableCell>
                <TableCell>
                  <IconButton component="span" className={!item.preview ? global_classes.iconButton : global_classes.greenIconButton} onClick={() => handlePreview(indx)} >
                    <VisibilityIcon className={global_classes.icon} />
                  </IconButton>
                  <IconButton component="span" className={global_classes.iconButton} onClick={() => handleEditItem(item.id)}>
                    <EditOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                  <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                    <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                </TableCell>
              </TableRow>
              {item.preview &&
                <TableRow>
                  <TableCell colSpan={9}>
                    <Grid container spacing={2} justify="space-around" style={{ padding: '10px 50px' }}>
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Cena zakupu [PLN]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.purchase_price} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Cena sprzedaży [PLN]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.sale_price} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Grupa asortymentowa
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.assortment_group_name} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Typ asortymentu
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.assortment_type} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Prawdopodobieństwo obsługi popytu [%]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.service_demand} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Czas cyklu uzupełnienia [dni]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.refill_cycle_time} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Odchylenie czasu cyklu uzupełnienia [dni]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.cycle_time_deviations} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 8 }}>
                              Współczynnik kosztu utrzymania zapasu [-]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.inventory_cost_factor} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              }
            </>
          )
          )}

        </TableBody>
      </Table>
      <DeleteModal
        title="Czy na pewno chcesz usunąć tę grupę asortyment?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
