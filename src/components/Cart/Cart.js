import React, {
  useCallback, useContext, useState, useEffect,
} from 'react';
import {
  Grid, Button, Typography, IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CartContext from '../../contexts/cartContext';

export default function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [cart, setCart] = useContext(CartContext);

  // Add a book to the cart
  const addCartItem = useCallback((idItem) => {
    setCart((oldCart) => {
      const indexBook = oldCart.findIndex((item) => item.id === idItem);

      if (indexBook !== -1) {
        oldCart[indexBook].qtd++;
      }

      return [...oldCart];
    });
  }, [cart]);

  // Remove a book from the cart
  const removeCartItem = useCallback((idItem) => {
    setCart((oldCart) => {
      const indexBook = oldCart.findIndex((item) => item.id === idItem);

      if (indexBook !== -1 && oldCart[indexBook].qtd > 1) {
        oldCart[indexBook].qtd--;
        return [...oldCart];
      }
      if (indexBook !== -1 && oldCart[indexBook].qtd === 1) {
        const newCart = oldCart.filter((item) => item.id !== idItem);

        return [...newCart];
      }
    });
  }, [cart]);

  // Clean the cart
  const handleCleanCart = () => {
    setCart([]);
  };

  useEffect(() => {
    // Sum the price of all the items in the cart
    let total = 0;
    cart.map((item) => {
      total += item.price * item.qtd;
    });
    setSubtotal(total);

    // Defines the discount based on cart length
    switch (cart.length) {
      case 0:
      case 1:
        setDesconto(0);
        break;

      case 2: // 5%
        setDesconto(0.05 * total);

        break;

      case 3: // 10%
        setDesconto(0.1 * total);

        break;

      case 4: // 20%
        setDesconto(0.2 * total);

        break;

      default: // 25%
        setDesconto(0.25 * total);
        break;
    }
  }, [cart]);

  return (
    <div style={{ padding: 20, width: '450px' }}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>Carrinho de compras</Typography>
      <hr />
      <div style={{ maxHeight: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
        {cart.map((item) => (
          <Grid key={item.id} container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <img src={item.imageLink} alt="" width={75} />
            </Grid>

            <Grid item xs>
              {item.title}
            </Grid>

            <Grid container item xs={4} sm justify="center" alignItems="center" direction="row">
              {/* remove item */}
              <Grid item xs>
                <IconButton onClick={() => removeCartItem(item.id)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>

              <Grid item xs style={{ textAlign: 'center' }}>
                {item.qtd}
              </Grid>

              {/* add item */}
              <Grid item xs>
                <IconButton onClick={() => addCartItem(item.id)}>
                  <AddIcon />
                </IconButton>
              </Grid>

            </Grid>

            <Grid item style={{ textAlign: 'right', paddingRight: '16px' }}>
              R$
              {item.price * item.qtd}
            </Grid>
          </Grid>
        ))}
      </div>

      {cart.length > 0 ? (
        <>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs sm style={{ textAlign: 'left' }}>
              Sub Total
            </Grid>
            <Grid item xs sm style={{ textAlign: 'right' }}>
              R$
              {subtotal.toFixed(2)}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs sm style={{ textAlign: 'left' }}>
              <b>
                {desconto > 0 ? `Desconto(${(desconto / subtotal) * 100}%)` : 'Desconto'}

              </b>
            </Grid>
            <Grid item xs sm style={{ textAlign: 'right' }}>
              <b>
                R$
                {desconto.toFixed(2)}
              </b>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs sm style={{ textAlign: 'left' }}>
              Total
            </Grid>
            <Grid item xs sm style={{ textAlign: 'right' }}>
              R$
              {(subtotal - desconto).toFixed(2)}
            </Grid>
          </Grid>

          <Grid container direction="row" item xs={12} justify="space-between" alignItems="center" style={{ marginTop: 15 }}>
            <Button variant="contained" color="default" startIcon={<DeleteOutlineIcon />} onClick={handleCleanCart}>Limpar carrinho</Button>

            <Button variant="outlined" color="primary" endIcon={<ArrowForwardIosIcon />} type="button">Ir para checkout</Button>
          </Grid>
        </>
      ) : (
        <Grid item container justify="center">
          <Typography align="center" variant="overline">Seu carrinho está vazio</Typography>
        </Grid>
      )}

    </div>
  );
}
