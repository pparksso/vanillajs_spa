import SelectItems from "./SelectItems.js";

export default function DetailItem($target, item) {
    const $container = document.createElement('div');
    $container.classList = 'ProductDetail';

    this.render = () => {
        $container.innerHTML = `
        <img src="${item.imageUrl}">
        <div class="ProductDetail__info">
          <h2>${item.name}</h2>
          <div class="ProductDetail__price">${item.price.toLocaleString()}원~</div>
          <select>
            <option>선택하세요.</option>
            ${
                item.productOptions.map(i => {
                    if(i.stock === 0) return `<option disabled=true>(품절) ${item.name} ${i.name}</option>`
                    else if(i.price === 0) return `<option>${item.name} ${i.name}</option>`
                    else if(i.price > 0) return `<option>${item.name} ${i.name}(+${i.price.toLocaleString()})</option>`
                }
                ).join('')
            }
          </select>
        `
        $target.appendChild($container);
        
        $container.addEventListener('change',(e) => {
          new SelectItems($container, item, e.target.value);
          // ProductDetail__info 밑으로 들어가야됨 ㅠㅠ 다시 짜야돼..
        })

    };
    
    this.render();
    
}