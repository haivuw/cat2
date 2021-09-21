import React, { useState, useContext } from 'react';
import { Scrollbar } from 'components/scrollbar';
import Button from 'components/button';
import { CURRENCY } from 'helpers/constants';
import { useCart } from 'contexts/cart/cart.provider';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ArrowLeft from 'assets/icons/arrow-left';
import Counter from 'components/counter';

export default function ProductDetails() {
  const [visibility, setVisibility] = useState(false);
  const { addItem, getItem, removeItem } = useCart();
  const { state, dispatch } = useContext(DrawerContext);

  const count = getItem(state.product.id)?.quantity;

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const hideDetails = () => {
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: null
      },
    });
  };

  const addToCart = () => {
    addItem(state.product);
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: 'cart'
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideDetails}
          aria-label="close"
        >
          <ArrowLeft />
        </button>

        <h2 className="font-bold text-24px m-0">Details</h2>
      </div>

      <Scrollbar className="details-scrollbar flex-grow">
        <div className="flex flex-col p-30px pt-0">
          <div className="flex items-center justify-center w-full h-360px overflow-hidden rounded mb-30px">
            <img src={state.product.image} alt={`${state.product.name}-img`} />
          </div>

          <div className="flex flex-col items-start mb-4">
            <span className="text-gray-900 font-semibold mb-2">
              {state.product.price ? (
                <>
                  {CURRENCY}
                  {state.product.price}
                </>
              ) : null}
            </span>
            <span className="mb-3">{state.product.name}</span>
            <p className="flex items-center mb-5">
              <span className=" text-gray-500 text-11px capitalize">
                {state.product.type}
              </span>
              <span className="flex bg-gray-500 w-3px h-3px rounded mx-3" />
              <span className=" text-gray-500 text-11px">
                {state.product.quantity}{' '}
                {state.product.quantity > 1 ? 'pieces' : 'piece'}
              </span>
            </p>

            {visibility === true ? (
              <p className="my-5">{state.product.description}</p>
            ) : (
              ''
            )}

            {state.product.description && (
              <button
                className="font-semibold text-11px text-gray-800 mt-2 focus:outline-none"
                onClick={toggleVisibility}
                aria-label="details"
              >
                {visibility === true ? 'Less Details' : 'More Details'}
              </button>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <span className="text-gray-500 text-11px mb-2">Dosages Form</span>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.product.type}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <span className="text-gray-500 text-11px mb-2">Dosages</span>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.product.dosage}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <span className="text-gray-500 text-11px mb-2">
                Active Substance
              </span>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.product.substance}
              </span>
            </div>

            <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
              <span className="text-gray-500 text-11px mb-2">Manufacturer</span>
              <span className="font-normal text-13px text-gray-900 capitalize">
                {state.product.manufacturer}
              </span>
            </div>
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        {count > 0 ? (
          <Counter
            value={count}
            className="ml-auto w-full big"
            size="big"
            onIncrement={() => {
              addItem(state.product);
            }}
            onDecrement={() => removeItem(state.product)}
          />
        ) : (
          <Button disabled={!state.product?.price} className="w-full big" onClick={addToCart}>
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
}
