import ProductList from './components/ProductList.js';

export default function App({$target}){

    const {pathname} = location;

    $target.innerHTML = '';

    if(pathname === '/') {
      ProductList({$target})
    } else if(pathname.includes('/products/')) {
    // 상세페이지
    } else if(pathname === 'cart') {
    // 장바구니 페이지
    }
    if(pathname === '/') {
       
    }

}