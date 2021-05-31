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

  const handleClick = (indx) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    _rows[indx].opened = !_rows[indx].opened;
    handleChange(_rows);
  }

  const handlePreview = (indx) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    _rows[indx].preview = !_rows[indx].preview;
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push(`/warehouse_group/edit/${id}`)
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
                Nazwa grupy
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 2}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(2)}
              >
                Przynależne magazyny
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
              >
                Aktywna
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
                  {item.active === 1 ?
                    <CheckIcon fontSize="small" className={classes.check_icon} />
                    :
                    <CloseIcon fontSize="small" className={classes.close_icon} />
                  }
                </TableCell>
                <TableCell>
                  <IconButton component="span" className={!item.preview ? global_classes.iconButton : global_classes.greenIconButton}  onClick={() => handlePreview(indx)} >
                    <VisibilityIcon className={ global_classes.icon}/>
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
                    <Grid container spacing={2} justify="space-around" style={{padding: '10px 50px'}}>
                      <Grid item xs={6}>
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                          Opis
                      </Typography>
                        <TextareaAutosize rows={7.3} value={item.description} className={global_classes.area} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                          Przyjęcia
                      </Typography>
                        <input value={item.received} className={global_classes.input_box} />
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                          Wydania
                      </Typography>
                        <input value={item.releases} className={global_classes.input_box} />
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                          Zapas
                      </Typography>
                        <input value={item.supply} className={global_classes.input_box} />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              }
              {
                item.opened &&
                item.sub_list.map((sub_item, index) => (
                  <TableRow key={indx} className={global_classes.root}>
                    <TableCell >{item.id}</TableCell>
                    <TableCell ></TableCell>
                    <TableCell >{sub_item.name}</TableCell>
                    <TableCell >
                      {item.active === 1 ?
                        <CheckIcon fontSize="small" className={classes.check_icon} />
                        :
                        <CloseIcon fontSize="small" className={classes.close_icon} />
                      }
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                ))
              }
            </>
          )
          )}

        </TableBody>
      </Table>
      <DeleteModal
        title="Czy na pewno chcesz usunąć tę grupę magazyny?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
