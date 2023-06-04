export default function SelectItems($target, item, value) {
    const $container = document.createElement('div');
    $container.classList = 'ProductDetail__selectedOptions'

    $container.innerHTML = '<h3>선택된 상품</h3>'
    
    this.render = () => {
        $target.appendChild($container);
        // new AddItem($target, item, value)

        $container.innerHTML += `
        <li>${value}</li><div><input type="number" min='1'>개</div>
        `
    }
    this.render()

}