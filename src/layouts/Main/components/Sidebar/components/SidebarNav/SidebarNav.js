/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, Fragment, useState, } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, Typography, Collapse } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	label: {
		padding: theme.spacing(2),
		justifyContent: 'flex-start',
		color: theme.palette.sidebar_color,
		fontFamily: 'roboto',
		fontSize: '0.7em'
	},
	title: {
		width: '240px'
	},
	button: {
		padding: theme.spacing(2, 4),
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: 400,
		fontSize: '0.8750em',
		color: theme.palette.sidebar_color,
		lineHeight: '1em',
		'&:hover': {
			color: theme.palette.white,
			fontWeight: 600,
			borderRadius: '0px',
		},
	},
	active: {
		fontWeight: 600,
		color: theme.palette.white,
		borderRadius: '0px'
	},
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style={{ flexGrow: 1 }}
	>
		<RouterLink {...props} />
	</div>
));

const SidebarNav = props => {
	const { pages, className, history, ...rest } = props;
	const [open, setOpen] = useState(false);
	const handleClick = (page) => {		
		history.push(page.href);
	}
	const classes = useStyles();

	return (
		<List
			{...rest}
			className={clsx(classes.root, className)}
		>
			{pages.map((page, index) => (
				page.label ?
					<Typography key={index} variant="h3" className={classes.label}>
						{page.label}
					</Typography>
					:
					(
						<Fragment key={index}>
							<ListItem
								className={classes.item}
								key={index}
								disableGutters
								key={page.title}
								onClick={() => handleClick(page)}
							>
								<Button
									activeClassName={!page.sub ? classes.active : classes.active_sub}
									className={classes.button}
									component={CustomRouterLink}
									to={page.href}
								>
									<div className={classes.title}>
										{page.title}
									</div>
								</Button>
							</ListItem>
						</Fragment>
					)
			))}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
