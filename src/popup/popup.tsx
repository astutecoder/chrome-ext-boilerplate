import React from 'react';
import { createRoot } from 'react-dom/client';
import { GeistProvider, CssBaseline, Text, Grid } from '@geist-ui/core';
import './popup.css';

const Popup = () => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Grid.Container gap={2} justify="center" className="container">
        <Grid xs={24}>
          <Text h4>Tab manager</Text>
        </Grid>
        <Grid xs={24}>
          <Text h4>Tab manager</Text>
        </Grid>
      </Grid.Container>
    </GeistProvider>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container!);

root.render(<Popup />);
