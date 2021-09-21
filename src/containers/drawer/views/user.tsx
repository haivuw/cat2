import { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { Scrollbar } from 'components/scrollbar';
import ArrowLeft from 'assets/icons/arrow-left';
import Input from 'components/input';
import Button from 'components/button';
import { useCart } from 'contexts/cart/cart.provider';
import Textarea from 'components/textarea';
import OrderSubmit from './order-submit';
import {
  InputBase,
  TextBoxCommonBase,
  TextBoxEnable,
} from 'components/utils/theme';
import { useAuth } from 'contexts/auth/provider';
const initialState = {
  phone_number: '',
  name: '',
  email: '',
  address: '',
  postal_code: '',
  suite: '',
};

export default function User() {
  const { user, logout } = useAuth();
  const { dispatch } = useContext(DrawerContext);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const logoutAndCloseDrawer = async () => {
    await logout();
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: null
      },
    });
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <h2 className="font-bold text-24px m-0">{user?.email}</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
          <div className="flex flex-col mb-45px">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Contact Information
            </span>
            <NumberFormat
              format="+1 (###) ###-####"
              mask="_"
              placeholder="Mobile Phone Number"
              className={`${InputBase} ${TextBoxCommonBase} ${TextBoxEnable}`}
              value={formData.phone_number}
              onValueChange={({ value }) =>
                setFormData({
                  ...formData,
                  phone_number: value,
                })
              }
            />
            {error?.field === 'phone_number' && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error.message}
              </p>
            )}
            <Input
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mt-15px"
            />
          </div>

          <div className="flex flex-col">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Shipping Address
            </span>
            <Input
              placeholder="Name"
              className="mb-10px"
              name="name"
              value={formData.name}
              onChange={onChange}
            />

            <Textarea
              placeholder="Enter Address"
              className="mb-10px"
              name="address"
              value={formData.address}
              onChange={onChange}
            />

            <div className="flex items-center mb-10px">
              <Input
                placeholder="Postal Code"
                style={{ width: 'calc(50% - 5px)', marginRight: '5px' }}
                name="postal_code"
                value={formData.postal_code}
                onChange={onChange}
              />
              <Input
                placeholder="Apartment, Suite, etc."
                style={{ width: 'calc(50% - 5px)', marginLeft: '5px' }}
                name="suite"
                value={formData.suite}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        <Button className="big w-full" onClick={logoutAndCloseDrawer} loading={false}>
          Logout
        </Button>
      </div>
    </div>
  );
}
