import React from 'react';
import { Grid } from '@material-ui/core';
import BookCard from '../BookCard';

export default function BooksList(props) {
  const { booksList } = props;
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {booksList.map((book, index) => (
        <Grid key={book.id} container alignItems="center" justify="center" item xs={3}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>

  );
}
