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
import { DeleteModal, FormInput, SingleSelect } from 'components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';

const SortTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { rows, sortOption, requestSort, searchOption, setSearchOption, listInfo, handleDelete, handleChange } = props;
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

  const handlePreview = (indx) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    _rows[indx].preview = !_rows[indx].preview;
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push(`/contractor/edit/${id}`)
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
                Kod
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
              >
                GLN
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 4}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(4)}
              >
                Dostawca
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 5}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(5)}
              >
                Odbiorca
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
              <input className={global_classes.input_box} value={searchOption.code} onChange={(e) => setSearchOption({ ...searchOption, code: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.GLN} onChange={(e) => setSearchOption({ ...searchOption, GLN: e.target.value })} />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.supplier}
                handleChange={(value) => setSearchOption({ ...searchOption, supplier: value })}
                list={listInfo.supplier}
              />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.recipient}
                handleChange={(value) => setSearchOption({ ...searchOption, recipient: value })}
                list={listInfo.recipient}
              />
            </TableCell>
            <TableCell>
              <SingleSelect
                value={searchOption.active}
                handleChange={(value) => setSearchOption({ ...searchOption, active: value })}
                list={listInfo.active}
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((item, indx) => (
            <>
              <TableRow key={indx} className={global_classes.root}>
                <TableCell >{item.id}</TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell >
                  {item.code}
                </TableCell>
                <TableCell >
                  {item.GLN}
                </TableCell>
                <TableCell >
                  {item.supplier === 1 ?
                    <CheckIcon fontSize="small" className={classes.check_icon} />
                    :
                    <CloseIcon fontSize="small" className={classes.close_icon} />
                  }
                </TableCell>
                <TableCell >
                  {item.recipient === 1 ?
                    <CheckIcon fontSize="small" className={classes.check_icon} />
                    :
                    <CloseIcon fontSize="small" className={classes.close_icon} />
                  }
                </TableCell>
                <TableCell >
                  {item.active === 1 ?
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
                  <TableCell colSpan={8}>
                    <Grid container spacing={3} justify="space-around" style={{ padding: '10px 50px' }}>
                      <Grid item xs={6}>
                        <Typography variant="h6" style={{ marginBottom: 4 }}>
                          Adres
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={5}>
                            <input value={item.address} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={3}>
                            <input value={item.postal_code} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={4}>
                            <input value={item.city} className={global_classes.input_box} />
                          </Grid>
                        </Grid>
                        <Typography variant="h6" style={{ marginBottom: 4, marginTop: 8 }}>
                          Opis
                        </Typography>
                        <TextareaAutosize rows={7.3} value={item.description} className={global_classes.area} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormInput title="Dostawca pokrywa koszt transportu" name="supplier_transport" type="check_box" value={item.supplier_transport} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 4 }}>
                              Czas realizacji zamówienia [dni]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.order_fulfillment_time} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 4 }}>
                              Odchylenie czasu realizacji [dni]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.delivery_time_deviation} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 4 }}>
                              Minimalna wiekość zamówienia
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.minimum_order_quantity} className={global_classes.input_box} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6" style={{ marginBottom: 4 }}>
                              Minimalna wartość zamówienia [PLN]
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input value={item.minimum_order_value} className={global_classes.input_box} />
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
        title="Czy na pewno chcesz usunąć tę kontrahenci?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
