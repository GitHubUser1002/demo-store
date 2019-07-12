import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import './App.css'
import { StickyContainer, Sticky } from 'react-sticky';
import * as _ from 'lodash';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import { ReactComponent as Icon } from './icons/cart.svg';

function App() {
  return (
    <StickyContainer>
      <Router>
      <Route path="/" render={() => (
        <Sticky>
          {({ style }) => (<header className="App-header" style={style}>
            <div/>
            <div className="Center-Header"><Link className="HomeLink" to="/">Store</Link></div>
            <div className="Cart-Header"><Icon className="Cart" width={33}/></div>
          </header>)}
        </Sticky>)
      } />
        <Route path='/product/:productId' render={({match}) => <Product productId={match.params.productId} />}/>
        <Route exact={true} path='/' component={Products}/>
      </Router>
    </StickyContainer>
  );
}

export default App;
