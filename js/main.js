class GameCell {

  constructor(game) {
    const self = this;
    this._state = 'unknown';
    this._element = document.createElement('td');
    game.appendChild(this.getElement());
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

  getElement() {
    return this._element;
  }
}

const container = document.getElementById('game');
const tr = document.createElement('tr');
const cell1 = new GameCell(container);
