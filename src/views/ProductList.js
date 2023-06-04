import request from '../api/request.js';
import ItemList from '../components/ItemList.js';

export default function ProductList($target) {
    const $container = document.createElement('div');
    $container.className = 'ProductListPage';
    $container.innerHTML = `<h1>상품목록</h1>`

   async function fetchItems() {
    const res = await request('/productList.json',{});
    new ItemList($container, res);
    }

    this.render = () => {
        $target.appendChild($container)
        fetchItems();
    }
    this.render()
}