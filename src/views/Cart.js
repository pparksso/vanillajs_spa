import { getItems, removeItems } from '../utils/storage.js';
import request from '../api/request.js';
import { navigate } from '../routes/navigate.js';

export default function Cart($target) {
    const $container = document.createElement('div');
    $container.classList = 'CartPage';

    $container.innerHTML = '<h1>장바구니</h1>';

    const cartData = getItems('products_cart',[]);

    this.state = {
        products: null,
        totalPrice: null,
    }

    this.setState = (nextState) => {
      this.state = nextState;
      this.render();
    }
    this.fetchProducts = async () => {
        const products = await request('/detail.json',{});
        const selectProducts = await cartData.map(cartItem => {
          const selectProduct = products.find(i => i.id === cartItem.productId);
          const selectOption = selectProduct.productOptions.find(i => i.id === cartItem.optionId);
          return {
            imgUrl:selectProduct.imageUrl,
            name: selectProduct.name,
            optionName: selectOption.name,
            quantity: cartItem.quantity,
            productPrice: selectProduct.price,
            optionPrice: selectOption.price,
          }
        });
        const totalProducts = await cartData.reduce((acc, cartItem) => {
          const selectProduct = products.find(i => i.id === cartItem.productId);
          const selectOption = selectProduct.productOptions.find(i=>i.id === cartItem.optionId);
         return acc + (( selectProduct.price + selectOption.price) * cartItem.quantity) 
        },0);
        this.setState({products: selectProducts, totalPrice:totalProducts})
      }
    this.fetchProducts();

    this.render = () => {
        if(cartData.length === 0) {
            alert('장바구니가 비어있습니다.');
            history.pushState(null, null, '/');
            navigate('/', true);
        } else {
          const { products, totalPrice } = this.state;
            $container.innerHTML += `
            <div class="Cart">
              <ul>
                ${
                  products.map(i => `
                  <li class="Cart__item">
                  <img src="${i.imgUrl}">
                  <div class="Cart__itemDesription">
                    <div>${i.name} ${i.optionName} ${i.quantity}개</div>
                    <div>${((i.productPrice + i.optionPrice) * i.quantity).toLocaleString()}원</div>
                  </div>
                </li>
                  `).join('')
                }
              </ul>
              <div class="Cart__totalPrice">
                총 상품가격 ${totalPrice.toLocaleString()}원
              </div>
              <button class="OrderButton">주문하기</button>
            </div>
            `
        }
        $target.appendChild($container);
    }

    $container.addEventListener('click',(e)=> {
      if(e.target.className === 'OrderButton') {
        removeItems('products_cart');
        alert('주문되었습니다.');
        history.pushState(null, null, '/');
        navigate('/',false);
      }
    })
}