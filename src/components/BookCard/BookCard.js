import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { RemoveShoppingCart } from '@material-ui/icons';
import cartContext from '../../contexts/cartContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    paddingBottom: 20,
    paddingTop: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function RecipeReviewCard(props) {
  const [cart, setCart] = useContext(cartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  const { book } = props;
  const {
    imageLink, author, country, pages, title, year, price,
  } = book;
  const classes = useStyles();

  useEffect(() => {
    if (cart?.find(serchBookInCart)) { setAddedToCart(true); } else { setAddedToCart(false); }
  }, [cart]);

  const serchBookInCart = (searchBook) => book.id === searchBook.id;

  const addItemToCart = useCallback((event) => {
    event.preventDefault();
    setCart((oldCart) => {
      const indexBook = oldCart.findIndex(serchBookInCart);
      if (indexBook !== -1) {
        // console.log(oldCart[book.id]);
        oldCart[indexBook].qtd++;
        return [...oldCart];
      }

      const newBook = { ...book, qtd: 1 };
      return [...oldCart, newBook];
    });
  }, [cart]);

  const removeItemFromCart = useCallback((event) => {
    event.preventDefault();
    setCart((oldCart) => {
      const newCart = oldCart.filter((item) => item.id !== book.id);

      return [...newCart];
    });
    // setAddedToCart(false);
  }, [cart]);

  return (
    <Card className={classes.root}>
      <CardMedia
        style={{ backgroundSize: 'contain' }}
        className={classes.media}
        image={`/${imageLink}`}
        title={title}
      />
      <CardContent>
        <Typography variant="h5">
          {title}
          {' '}
          (
          {year}
          )
        </Typography>
        <Typography variant="body2">
          {author}
          {' '}
          -
          {' '}
          {country}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 7 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolor ex minima fugiat repellat officiis dolores! Sequi dolor facere amet minima recusandae suscipit rem illo aliquam.
        </Typography>
        <Typography variant="h5" style={{ marginTop: 7 }}>
          R$
          {price.toFixed(2).toLocaleString('pt-BR')}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }} disableSpacing>
        {!addedToCart ? (

          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={(event) => addItemToCart(event)}
          >
            Adicionar ao carrinho

          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            type="button"
            startIcon={<RemoveShoppingCart />}
            onClick={(event) => removeItemFromCart(event)}
          >
            Remover do carrinho

          </Button>
        )}

      </CardActions>
    </Card>
  );
}
