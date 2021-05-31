import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    color: theme.palette.black,
    fontFamily: 'roboto',
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: theme.palette.green,
    fontSize: '0.8125em',
  },
  typo: {
    color: theme.palette.black,
    fontSize: '1em',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1)
  },
  pagenation_class: {
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.pagination_background,
      color: theme.palette.pagination_color
    }
  }
}));

const PaginationController = props => {
  const { total, page, setPage } = props;
  const classes = useStyles();

  return (
    <div className={classes.pagination}>
      <Pagination
        className={classes.pagenation_class}
        count={total % 25 == 0 ? total / 25 : parseInt(total / 25) + 1}
        onChange={(e, page) => { setPage(page) }}
        page={page}
        showFirstButton
        showLastButton />
    </div>
  );
};

export default PaginationController;
