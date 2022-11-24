import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/index';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const showCartHandler = () => {
    dispatch(cartActions.toggleCart())
  }
  const itemQuantity = useSelector(state => state.cart.quantity)
  console.log(itemQuantity)
  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemQuantity}</span>
    </button>
  );
};

export default CartButton;
