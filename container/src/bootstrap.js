import { mount as pproductsMount } from 'products/ProductsIndex';
import { mount as cartMount } from 'cart/CartShow';

pproductsMount(document.querySelector('#my-products'));
cartMount(document.querySelector('#my-cart'));

console.log('Container!');
