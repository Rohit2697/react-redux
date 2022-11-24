import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux'
const Cart = (props) => {
  const cartItem = useSelector(state => state.cart.cartProducts)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItem.length ? cartItem.map(item => {
          return <CartItem key={item.id}
            item={{ id: item.id, title: item.title, quantity: item.quantity, total: item.total, price: item.price , description:item.description}}
          />
        }) : <h2>No Item in the card yet</h2>}
      </ul>
    </Card>
  );
};

export default Cart;
