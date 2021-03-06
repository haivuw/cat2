import UserIcon from "assets/icons/user-icon";
import { useAuth } from "contexts/auth/provider";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useContext } from "react";
import Button from "./button";

const email = 'vuh264@gmail.com'; 
const password = '123123'

const User = () => {
  const { dispatch }: any = useContext(DrawerContext);
  const { user, login } = useAuth();

  const showUser = () => {
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: 'user',
      },
    });
  };

  const showLogin = () => {
    dispatch({
      type: 'OPEN_VIEW',
      payload: {
        view: 'login',
      },
    });
  };

  const userIcon = (
    <button
      className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
      onClick={showUser}
      aria-label="cart-button"
    >
      <UserIcon width="20px" height="20px" />
    </button>
  )

  const loginButton = (
    <div className="flex flex-col p-30px">
      <Button className="big w-full" onClick={showLogin} loading={false}>
        Login
      </Button>
    </div>
  )

  return user ? userIcon : loginButton
}

export default User