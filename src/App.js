import ProductList from './views/ProductList.js';
import Detail from './views/Detail.js';
import Cart from './views/Cart.js';

export default function App($target) {
    this.route = () => {
        $target.innerHTML = '';
        const { pathname } = location;
        if(pathname === '/') new ProductList($target);
        else if(pathname.includes('/products')) new Detail($target);
        else if(pathname === '/cart') new Cart($target);
    }
    this.route();
}