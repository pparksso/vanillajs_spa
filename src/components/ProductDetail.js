import request from "../api/request";

export default function ProductDetail({$target}) {
    const $page = document.createElement('div');
    $page.classList = 'ProductDetailPage'

    const $h1 = document.createElement('h1');

    const $detail = document.createElement('div');
    $detail.classList = 'ProductDetail'

    const fetchItem = async () => {
        const item = await request('/detail.json',{});
        $h1.innerHTML = `${item.name} 상품 정보`

        $detail.innerHTML = `
        <img src="${item.imageUrl}">
        <div class="ProductDetail__info">
          <h2>${item.name}</h2>
          <div class="ProductDetail__price">${item.price.toLocaleString()}원~</div>
          <select>
            <option>선택하세요.</option>
            ${
                item.productOptions.map((i)=> `
                <option>${i.name}</option>`
                )
            }
          </select>
          <div class="ProductDetail__selectedOptions">
            <h3>선택된 상품</h3>
            <ul>
              <li>
                커피잔 100개 번들 10,000원 <div><input type="number" value="10">개</div>
              </li>
              <li>
                커피잔 1000개 번들 15,000원 <div><input type="number" value="5">개</div>
              </li>
            </ul>
            <div class="ProductDetail__totalPrice">175,000원</div>
            <button class="OrderButton">주문하기</button>
          </div>
        </div>
        `
    }
    fetchItem();

    return $target.appendChild($page);
}