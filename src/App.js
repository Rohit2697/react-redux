import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { sendCartData, fetchCartdata } from './store/index'
import Notification from './components/Notifications/Notification';
let isSendData = false;
function App() {
  const showCart = useSelector(state => state.cart.showCart)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.cart.showNotification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartdata())

  }, [dispatch])
  useEffect(() => {
    if (!isSendData) {
      isSendData = true
      return
    }
    if (cart.changed) {
      console.log(cart)
      dispatch(sendCartData(cart))
      isSendData = false
    }
  }, [cart, dispatch])
  return (
    <>
      {notification.status && <Notification title={notification.title}
        status={notification.status}
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
