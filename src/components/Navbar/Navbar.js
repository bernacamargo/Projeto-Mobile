import React, { useContext, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import cartContext from '../../contexts/cartContext';
import Cart from '../Cart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: '40%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const { searchBooks } = props;
  const classes = useStyles();
  const [cart] = useContext(cartContext);
  const [openCart, setOpenCart] = useState(null);

  const handleOpenCart = (event) => {
    setOpenCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setOpenCart(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Livraria
          </Typography>
          {/* Search input */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Qual livro você está procurando?"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                e.persist();
                searchBooks(e.target.value);
              }}
            />
          </div>
          {/* Cart button */}
          <IconButton edge="start" color="default" onClick={(event) => handleOpenCart(event)}>
            <Badge color="secondary" badgeContent={cart.length}>
              <ShoppingCartIcon style={{ color: '#fff' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Cart */}
      <Popover
        id={openCart ? 'simple-popover' : undefined}
        open={Boolean(openCart)}
        anchorEl={openCart}
        onClose={handleCloseCart}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Cart cart={cart} />
      </Popover>

    </div>
  );
}
