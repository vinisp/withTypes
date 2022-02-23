import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { useContext } from "react";

import { CartContext } from "../Components/widgets/Cart/CartContext";

export function Profile() {
  const myCart = useContext(CartContext);

  console.log(myCart);
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>Profile Page </div>
    </>
  );
}
