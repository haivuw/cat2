import React, { useContext } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ProductDetails from './views/product-details';
import Cart from './views/cart';
import Checkout from './views/checkout';
import DrawerMenu from './views/menus';
import User from './views/user';
import Login from './views/login';

export const CartDrawer = () => {
  const { state, dispatch } = useContext(DrawerContext);

  const handleClose = () =>
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: null,
      },
    });
    
  const drawerComponent = ((view) => {
    switch (view) {
      case 'product': 
        return <ProductDetails />;

      case 'cart':
        return <Cart />;

      case 'checkout':
        return <Checkout />;

      case 'user':
        return <User />;

      case 'login':
        return <Login />;

      default:
        return null
    }
  })(state?.view)
  
  

  return (
    <React.Fragment>
      {state.view ? (
        <div className="overlay" role="button" onClick={handleClose} />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-cart ${state.view ? 'open' : ''}`}
      >
        {drawerComponent}
      </div>
    </React.Fragment>
  );
};

export const Drawer = () => {
  const { state, dispatch }: any = useContext(DrawerContext);

  const handleClose = () =>
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: false,
      },
    });

  return (
    <React.Fragment>
      {state?.menu === true ? (
        <div
          className="overlay overlay-menu"
          role="button"
          onClick={handleClose}
        />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-menu ${state?.menu === true ? 'open' : ''}`}
      >
        <DrawerMenu />
      </div>
    </React.Fragment>
  );
};
