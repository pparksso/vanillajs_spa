import request from "../api/request.js";
import DetailItem from "../components/DetailItem.js";


export default function Detail($target) {
    const $container = document.createElement('div');
    $container.classList = 'ProductDetailPage';
    $container.innerHTML = '<h1>커피잔 상품 정보</h1>'

    const id = location.pathname.split('/').pop();
    async function fetchItem() {
        const res = await request('/detail.json',{});
        const item = res.filter(i =>i.id == id);
        new DetailItem($target, item[0]);
    }
    
    this.render = () => {
        fetchItem()
        $target.appendChild($container);
    }
    this.render()
}