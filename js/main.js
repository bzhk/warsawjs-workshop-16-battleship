
class ViewComponent {
  getElement() {
    return this._element;
  }
}

class GameCell extends ViewComponent{

  constructor() {
    super();
    const self = this;
    this._state = 'unknown';
    this._element = document.createElement('td');
    this._element.addEventListener('click', function(){
      self.setState('miss');
      console.log(self._state)
    });

  }

  setState(state) {
    if( state !== 'unknkown' && state !== 'miss' && state !== 'hit'){
      throw new Error('Invalid state');
    }
    this._state = state;
    this._element.className = 'cell_' + state;
  }


}

const container = document.getElementById('game');
const tr = document.createElement('tr');
container.appendChild(tr);
const cell1 = new GameCell();
tr.appendChild(cell1.getElement());
