import request from '../api/request.js';

export default function ProductList({$target}) {

    const $page = document.createElement('div');
    $page.className = "ProductListPage";
    $page.innerHTML = '<h1>상품 목록</h1>'
    const $list = document.createElement('ul');

    const fetchItems = async () => {
     const items = await request('/productList.json',{});
        $list.innerHTML = `
    ${items.map((i) => 
        `
        <li class="Product" data-id='${i.id}'>
        <img src='${i.imageUrl}'>
        <div class="Product__info">
          <div>${i.name}</div>
          <div>${i.price.toLocaleString()}원~</div>
        </div>
      </li>
        `
    ).join('')}
    `
    $page.appendChild($list);   
    };
    fetchItems();
    
    $list.addEventListener('click',(e) => {
      const li = e.target.closest('li');
      const {id} = li.dataset;

      if(id) {
        history.pushState(null,null,`/products/${id}`)
      }
    })

    return $target.appendChild($page)
}