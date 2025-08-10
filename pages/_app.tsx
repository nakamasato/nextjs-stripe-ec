import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { Container, Navbar } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Hello EC</Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </>
  );
}
