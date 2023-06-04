export default function Detail($target) {
    const $container = document.createElement('div');
    $container.classList = 'ProductDetailPage';
    $container.innerHTML = '<h1>커피잔 상품 정보</h1>'
    this.render = () => {
        $target.appendChild($container)
    }
    this.render()
}