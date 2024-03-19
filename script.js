document.addEventListener('DOMContentLoaded', function () {
  const cells = document.querySelectorAll('.cell');
  const status = document.querySelector('.status');
  const resetButton = document.querySelector('.reset-button');

  let currentPlayerSymbol = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleCellClick = (cellIndex) => {
    if (board[cellIndex] === '' && gameActive) {
      board[cellIndex] = currentPlayerSymbol;
      cells[cellIndex].textContent = currentPlayerSymbol;
      cells[cellIndex].classList.add('played'); 

      if (checkWin()) {
        status.textContent = `Player ${currentPlayerSymbol} wins!`;
        gameActive = false;
       
      } else if (checkDraw()) {
        status.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayerSymbol = currentPlayerSymbol === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayerSymbol}'s turn`;
        cells.forEach(cell => cell.classList.remove('played')); 
      }
    }
  };

  const checkWin = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];
      const [a, b, c] = combination;
      if (board[a] === currentPlayerSymbol && board[b] === currentPlayerSymbol && board[c] === currentPlayerSymbol) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    return board.every(cell => cell !== '');
  };

  const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayerSymbol = 'X';
    gameActive = true;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('played'); 
    });
    status.textContent = `Player ${currentPlayerSymbol}'s turn`;
  };


  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const cellIndex = parseInt(cell.getAttribute('data-index'));
      handleCellClick(cellIndex);
      cell.removeEventListener('click', () => {}); 
    });
  });

  resetButton.addEventListener('click', resetGame);
});
