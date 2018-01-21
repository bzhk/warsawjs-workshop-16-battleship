const gameElement = document.getElementById('game');
const row = document.createElement('tr');
const cell = document.createElement('td');
const cell1 = document.createElement('td');
row.appendChild(cell);
row.appendChild(cell1);
gameElement.appendChild(row);

const trArr = document.querySelector('#game tr').childNodes;

trArr.forEach( (elem) => {
  elem.addEventListener('click', function() {
    return !this.classList.length ? this.classList.add('clicked') : this.classList.remove('clicked');
  });
});
