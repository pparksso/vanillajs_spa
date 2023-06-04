export default function ItemList($target, items) {
    const $list = document.createElement('ul');
    
    this.render = () => {
        $list.innerHTML = `
        ${
            items.map(i => 
                `
                <li class="Product" data-id=${i.id}>
                <img src="${i.imageUrl}">
                <div class="Product__info">
                  <div>${i.name}</div>
                  <div>${i.price.toLocaleString()}원~</div>
                </div>
              </li>
                `).join('')
        }
        `
        $target.appendChild($list);
        
        $list.addEventListener('click',(e) => {
          const {id} = e.target.closest('li').dataset;
          history.pushState(null, null, `/products/:${id}`)
        })
    }

    this.render()
}