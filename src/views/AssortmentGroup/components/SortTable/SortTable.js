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
  const { rows, sortOption, requestSort, searchOption, setSearchOption, handleDelete, handleChange } = props;
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

  const handleClick = (indx) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    _rows[indx].opened = !_rows[indx].opened;
    handleChange(_rows);
  }

  const handlePreview = (indx_main, indx_sub, is_sub) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    if (is_sub) {
      _rows[indx_main].sub_list[indx_sub].preview = !_rows[indx_main].sub_list[indx_sub].preview;
    } else {
      _rows[indx_main].preview = !_rows[indx_main].preview;
    }
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push(`/group_assortment/edit/${id}`)
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
                Nazwa głównej grupy
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 2}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(2)}
              >
                Nazwa podgrupy
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
              >
                Kod
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
              <input className={global_classes.input_box} value={searchOption.sub_name} onChange={(e) => setSearchOption({ ...searchOption, sub_name: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.code} onChange={(e) => setSearchOption({ ...searchOption, code: e.target.value })} />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((item, indx) => (
            <>
              <TableRow key={indx} className={global_classes.root}>
                <TableCell >{item.id}</TableCell>
                <TableCell onClick={() => handleClick(indx)}>
                  <div style={{ display: 'flex' }}>
                    {
                      item.opened
                        ?
                        item.sub_list.length > 0 && <RemoveIcon fontSize="small" className={classes.plus_minus_icon} />
                        :
                        item.sub_list.length > 0 && <AddIcon fontSize="small" className={classes.plus_minus_icon} />
                    }
                    {item.name}
                  </div>
                </TableCell>
                <TableCell ></TableCell>
                <TableCell >
                  {item.code}
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
                  <TableCell colSpan={5}>
                    <Grid container spacing={2} justify="space-around" style={{ padding: '10px 50px' }}>
                      <Grid item xs={6}>
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                          Opis
                        </Typography>
                        <TextareaAutosize rows={6} value={item.description} className={global_classes.area} />
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
              {
                item.opened &&
                item.sub_list.map((sub_item, index) => (
                  <React.Fragment>
                    <TableRow key={indx} className={global_classes.root}>
                      <TableCell >{item.id}</TableCell>
                      <TableCell ></TableCell>
                      <TableCell >{sub_item.name}</TableCell>
                      <TableCell >
                        {sub_item.code}
                      </TableCell>
                      <TableCell>
                        <IconButton component="span" className={!sub_item.preview ? global_classes.iconButton : global_classes.greenIconButton} onClick={() => handlePreview(indx, index, true)} >
                          <VisibilityIcon className={global_classes.icon} />
                        </IconButton>
                        <IconButton component="span" className={global_classes.iconButton} onClick={() => handleEditItem(sub_item.id)}>
                          <EditOutlinedIcon className={global_classes.icon} />
                        </IconButton>
                        <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                          <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {
                      sub_item.preview &&
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Grid container spacing={2} justify="space-around" style={{ padding: '10px 50px' }}>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Opis
                            </Typography>
                              <TextareaAutosize rows={6} value={sub_item.description} className={global_classes.area} />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="h6" style={{ marginBottom: 8 }}>
                                    Prawdopodobieństwo obsługi popytu [%]
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <input value={sub_item.service_demand} className={global_classes.input_box} />
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="h6" style={{ marginBottom: 8 }}>
                                    Czas cyklu uzupełnienia [dni]
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <input value={sub_item.refill_cycle_time} className={global_classes.input_box} />
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="h6" style={{ marginBottom: 8 }}>
                                    Odchylenie czasu cyklu uzupełnienia [dni]
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <input value={sub_item.cycle_time_deviations} className={global_classes.input_box} />
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="h6" style={{ marginBottom: 8 }}>
                                    Współczynnik kosztu utrzymania zapasu [-]
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <input value={sub_item.inventory_cost_factor} className={global_classes.input_box} />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    }
                  </React.Fragment>
                ))
              }
            </>
          )
          )}

        </TableBody>
      </Table>
      <DeleteModal
        title="Czy na pewno chcesz usunąć tę grupę asortymentowe?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
