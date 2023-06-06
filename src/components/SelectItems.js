import { getItems, setItems } from '../utils/storage.js';
import { navigate } from '../routes/navigate.js'

export default function SelectItems($target, selectedItems, item) {
    this.state = {
        product: item,
        selectedOptions: selectedItems
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.getTotalPrice = () => {
        const {product, selectedOptions} = this.state;
        const { price } = product;
        const totalPrice = selectedOptions.reduce((acc, option) => 
            acc + ((price + option.optionPrice) * option.quantity)
        ,0);
        return totalPrice;
    };

    this.render = () => {
        $target.innerHTML = '';
        const { selectedOptions } = this.state;
        $target.innerHTML += `
        <h3>선택된 상품</h3>
        <ul>
        ${selectedOptions.map(i => `
                <li>${i.optionName}<div><input type="number" min='1' max='${i.optionStock}' value=${i.quantity} data-optionid='${i.optionId}'>개</div></li>
                `
        ).join('')
    }</ul>
    <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
    <button class="OrderButton">주문하기</button>
        `
    }

    $target.addEventListener('change',(e) => {
        if(e.target.tagName === 'INPUT') {
            try {
                const nextQuantity = Number(e.target.value);
                const nextSelectedOptions = [ ...this.state.selectedOptions ];
                const optionId = Number(e.target.dataset.optionid);
                const { product } = this.state;
                const option = product.productOptions.find(option => option.id === optionId);
                const selectedOptionIndex = nextSelectedOptions.findIndex(selectedOption => selectedOption.optionId === optionId);

                nextSelectedOptions[selectedOptionIndex].quantity = option.stock >= nextQuantity ? nextQuantity : option.stock;

                this.setState({
                    ...this.state,
                    selectedOptions: nextSelectedOptions,
                })
            } catch(err) {
                console.log(err);
            }
        }
    })

    $target.addEventListener('click',(e) => {
        const { selectedOptions } = this.state;
        if(e.target.className === 'OrderButton') {
           const cartData = getItems('products_cart',[]);
           setItems('products_cart', cartData.concat(selectedOptions.map(i=>({
            productId: i.productId,
            optionId:i.optionId,
            quantity: i.quantity,
           }))
           ))
           history.pushState(null,null, '/cart')
           navigate('/cart', false)
        }
    })
    this.render()

}