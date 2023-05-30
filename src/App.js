import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';

export default function App({$target}){

    const {pathname} = location;

    $target.innerHTML = '';

    if(pathname === '/') {
      ProductList({$target})
    } else if(pathname.includes('/products/')) {
      ProductDetail({$target})
    } else if(pathname === 'cart') {
    // 장바구니 페이지
    }
}