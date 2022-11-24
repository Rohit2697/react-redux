import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const products = [{
    id: 'p1',
    title: 'First Book',
    price: 6,
    description: 'this is my first book',

  },
  {
    id: 'p2',
    title: 'second Book',
    price: 7,
    description: 'this is my second book',

  }]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(item => {
          return <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        })}
      </ul>
    </section>
  );
};

export default Products;
