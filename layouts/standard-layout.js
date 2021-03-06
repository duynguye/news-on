import React from 'react'
import Head from 'components/head'
import Header from 'components/header'
import Footer from 'components/footer'

const StandardLayout = ({ children }) => (
  <div>
    <Head />
    
    <section>
      <Header />
      { children }
      <Footer />
    </section>

    <style jsx global>{`
      html, body {
        margin: 0;
        overflow-x: hidden;
        padding: 0;
        -webkit-font-smoothing: antialiased;
	      -moz-osx-font-smoothing: grayscale;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      @font-face {
        font-family: 'Brandon Text';
        font-weight: 400;
        src: url('/fonts/bt-regular.otf');
      }

      @font-face {
        font-family: 'Brandon Text';
        font-weight: 500;
        src: url('/fonts/bt-medium.otf');
      }
    `}</style>
  </div>
)

export default StandardLayout