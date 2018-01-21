
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

  constructor(x, y, handleCellClick) {
    super();
    const self = this;
    this._state = 'unknown';
    this._cords = {x: x, y: y};
    this._element = document.createElement('td');
    this._element.addEventListener('click', function(){
      handleCellClick(x, y, self._state);
    });

  }

  setState(state) {
    if( state !== 'unknown' && state !== 'miss' && state !== 'hit' && state !== 'shipField'){
      throw new Error('Invalid state');
    }
    this._state = state;
    if(state !== 'shipField'){
      this._element.className = 'cell_' + state;
    }
  }
}

class GameBoard extends ViewComponent{
  constructor(rowsCount, itemsCount, handleCellClick){
    super();
    this._rowsCount = rowsCount;
    this._itemsCount = itemsCount;
    this.board = [];
    this.ships = [ {x:1,y:1} ]
    this._element = this.buildAllBoard(10,10);
    this.handleCellClick = handleCellClick;
    this.setShips();
  }

  setShips(){
    this.setStateAt(1,1,'shipField');
    this.setStateAt(2,1,'shipField');
    this.setStateAt(3,1,'shipField');
  }

  buildRow(itemCount, row){
    let rowArr = [];
    const tr = document.createElement('tr');
    for(let count=0; count<itemCount; count++){
      let cell = new GameCell(count , row, handleCellClick);
      cell.getElement().id = `${count}${row}`;
      tr.appendChild(cell.getElement());
      rowArr.push(cell);
    }
    return {row: rowArr, tr: tr,};
  }

  buildAllBoard(rowsCount, itemsCount){
    const container = document.createElement('table');
    for(let i=0; i<rowsCount; i++){
      const line = this.buildRow(itemsCount, i);
      container.appendChild(line.tr);
      this.board.push(line.row);
    }
    return container;
  }

  setStateAt(row, column, state){
    return this.board[row][column].setState(state);
  }

  returnBoard(){
    return this.board;
  }
}

class GameController {
  constructor(board, gameLoop){

    this._boardView = board;
  }

  handleCellClick(row, column, state){

    gameLoop.fireAt(row, column, state, this._boardView);

  }
}

class GameModel {
    constructor(){
      this._score = 0;
      this._rocket = 0;
      this._lastScore = 0;
      this._ships = [];
    }

    fireAt(row, column, state, board){
      let brake;
      this._ships.filter( x => {
        if(x.cords === row + '/' + column){
          alert('Nie mozesz strzelać w to samo pole');
          brake = true;
        }
      });

      if(brake) {
        return;
      }

      let elem = {
        cords: row + '/' + column,
        clicked: true,
        isShip: false,
      }

      if(state === 'shipField'){
        this.updateRockets();
        this.updateScore();
        this.updateLastScore();
        elem.isShip = true;
        board[column][row].setState('hit');
      }else{
        this.updateLastScore(true);
        board[column][row].setState('miss');
      }
      this._ships.push(elem);
      console.log(this._ships)
    }


    updateScore(){
      this._score += 10;
      this._lastScore += 10;
    }

    updateRockets(){
      this._rocket += 1;
    }

    updateLastScore(x){
      if(x){
        this._lastScore = this._lastScore - 5;
      }
    }

    returnScore(){
      console.log(this._lastScore);
      return this._lastScore;
    }

}

let board;
let controller;
let gameLoop = new GameModel();

function handleCellClick(row, column, state){
  controller.handleCellClick(row, column, state);
}


newGame = new GameBoard(10,10, handleCellClick);
controller = new GameController(newGame.returnBoard(),gameLoop);
const game = document.getElementById('app');
game.appendChild(newGame.getElement());
