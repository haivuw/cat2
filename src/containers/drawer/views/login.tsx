import { useContext, useState } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import Input from 'components/input';
import Button from 'components/button';
import { useAuth } from 'contexts/auth/provider';
import { useFormik } from 'formik'
import * as yup from 'yup';

const initialState = {
  password: '',
  email: '',
};

export default function Login() {
  const { login } = useAuth();
  const { dispatch } = useContext(DrawerContext);

  const hideUser = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        showUser: false,
      },
    });
    dispatch({
      type: 'TOGGLE_LOGIN_VIEW',
      payload: {
        showLogin: false,
      },
    });
  };

  const loginAndCloseDrawer = async (values) => {
    await login(values.email, values.password);
    hideUser();
  }

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: values => loginAndCloseDrawer(values),
    validationSchema: yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required()
    })
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik

  return (
    <div className="flex flex-col w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-30px pt-20px">
          <div className="flex flex-col mb-35px">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Login to your account
            </span>
            <Input
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-15px"
            />
            <p className="text-12px font-semibold text-error pt-10px pl-15px">
              {touched.email && errors.email}
            </p>
            <Input
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-15px"
            />
            <p className="text-12px font-semibold text-error pt-10px pl-15px">
              {touched.email && errors.password}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-30px">
          <Button className="big w-full" type="submit" loading={false}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
