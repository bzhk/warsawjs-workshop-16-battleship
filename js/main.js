
class ViewComponent {
  constructor(){
    if(new.target === ViewComponent){
      throw new Error('Abstract class');
    }
  }
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

class GameBoard extends ViewComponent{
  constructor(rowsCount, itemsCount){
    super();
    this._rowsCount = rowsCount;
    this._itemsCount = itemsCount;
    this.board = [];

    this._element = this.buildAllBoard(10,10);
    console.log(this.board);
  }

  buildRow(x, y){
    let row = [];
    const tr = document.createElement('tr');
    for(let i=0; i<x; i++){
      let cell = new GameCell();
      cell.id = `${i}${y}`;
      tr.appendChild(cell.getElement());
      row.push(cell);
    }
    return {row: row, tr: tr,};
  }

  buildAllBoard(x,y){
    const container = document.createElement('table');
    for(let i=0; i<x; i++){
      const line = this.buildRow(y, i);
      container.appendChild(line.tr);
      this.board.push(line.row);
    }
    return container;
  }
}

const newGame = new GameBoard(10,10);
const game = document.getElementById('app');
game.appendChild(newGame.getElement());
