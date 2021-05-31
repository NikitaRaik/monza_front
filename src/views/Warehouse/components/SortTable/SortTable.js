import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  Card
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { DeleteModal, SingleSelect } from 'components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';

const SortTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { rows, sortOption, requestSort, searchOption, setSearchOption, listInfo, handleDelete } = props;
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
                Nazwa magazynu
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 2}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(2)}
              >
                Opis
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
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
              <input className={global_classes.input_box} value={searchOption.description} onChange={(e) => setSearchOption({ ...searchOption, description: e.target.value })} />
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
          {rows.map((item, indx) => {
            return (
              <TableRow key={indx} className={global_classes.root}>
                <TableCell onClick={() => history.push(`/warehouse/edit/${item.id}`)}>{item.id}</TableCell>
                <TableCell onClick={() => history.push(`/warehouse/edit/${item.id}`)}>{item.name}</TableCell>
                <TableCell onClick={() => history.push(`/warehouse/edit/${item.id}`)}>{item.description}</TableCell>
                <TableCell onClick={() => history.push(`/warehouse/edit/${item.id}`)}>
                  {item.active === 1 ? 
                    <CheckIcon fontSize="small" className={classes.check_icon}/> 
                    : 
                    <CloseIcon fontSize="small" className={classes.close_icon}/>
                  }
                </TableCell>
                <TableCell>
                  <IconButton component="span" className={global_classes.iconButton} onClick={() => history.push(`/warehouse/edit/${item.id}`)}>
                    <EditOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                  <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                    <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <DeleteModal
        title="Czy na pewno chcesz usunąć tę magazyny?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
