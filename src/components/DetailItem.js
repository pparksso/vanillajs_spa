import SelectItems from "./SelectItems.js";

export default function DetailItem($target, item) {
    const $container = document.createElement('div');
    $container.classList = 'ProductDetail';
    $container.innerHTML = `<img src="${item.imageUrl}">`

    let selectedItems = [];


    this.render = () => {
        $container.innerHTML = `
        <img src="${item.imageUrl}">
        <div class='ProductDetail__info'>
        <h2>${item.name}</h2>
          <div class="ProductDetail__price">${item.price.toLocaleString()}원~</div>
          <select>
            <option>선택하세요.</option>
            ${
                item.productOptions.map(i => {
                    if(i.stock === 0) return `<option disabled=true>(품절) ${item.name} ${i.name}</option>`
                    else if(i.price === 0) return `<option value='${i.id}'>${item.name} ${i.name}</option>`
                    else if(i.price > 0) return `<option value='${i.id}'>${item.name} ${i.name}(+${i.price.toLocaleString()})</option>`
                }
                ).join('')
            }
          </select>
          <div class="ProductDetail__selectedOptions"></div>
          </div>
        `
        $target.appendChild($container);       
        
        $container.addEventListener('change',(e) => {
            if(e.target.tagName === 'SELECT') {
                const selectedOptionId = Number(e.target.value);
                const option = item.productOptions.find(option => option.id === selectedOptionId);
                if(!selectedItems.find(i => i.optionId === selectedOptionId)) {
                    selectedItems = [
                        ...selectedItems,
                        {
                            productId:item.id,
                            optionId: option.id,
                            optionName:option.name,
                            optionPrice: option.price,
                            optionStock:option.stock,
                            quantity:1
                        }
                    ]
                }
                new SelectItems(document.querySelector('.ProductDetail__selectedOptions'), selectedItems,item);
            }
          })
    };
    
    this.render();
    
}