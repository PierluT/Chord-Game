class GOL {
    constructor() {
      // Initialize rows, columns and set-up arrays
      this.columns = this.width / this.w;
      this.rows = this.height / this.w;
      this.board = new Array(this.columns).fill(null).map(() => new Array(this.rows).fill(null));
      // Call function to fill array with random values 0 or 1
      this.init();
    }
  
    init() {
      for (let i = 1; i < this.columns - 1; i++) {
        for (let j = 1; j < this.rows - 1; j++) {
          this.board[i][j] = Math.floor(Math.random() * 2);
        }
      }
    }
  
    // The process of creating the new generation
    generate() {
      const next = new Array(this.columns).fill(null).map(() => new Array(this.rows).fill(null));
  
      // Loop through every spot in our 2D array and check spots neighbors
      for (let x = 1; x < this.columns - 1; x++) {
        for (let y = 1; y < this.rows - 1; y++) {
          // Add up all the states in a 3x3 surrounding grid
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              neighbors += this.board[x + i][y + j];
            }
          }
  
          // A little trick to subtract the current cell's state since
          // we added it in the above loop
          neighbors -= this.board[x][y];
  
          // Rules of Life
          if (this.board[x][y] === 1 && neighbors < 2) next[x][y] = 0; // Loneliness
          else if (this.board[x][y] === 1 && neighbors > 3) next[x][y] = 0; // Overpopulation
          else if (this.board[x][y] === 0 && neighbors === 3) next[x][y] = 1; // Reproduction
          else next[x][y] = this.board[x][y]; // Stasis
        }
      }
  
      // Next is now our board
      this.board = next;
    }
  
    // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
    display() {
      for (let i = 0; i < this.columns; i++) {
        for (let j = 0; j < this.rows; j++) {
          if (this.board[i][j] === 1) fill(255);
          else fill(0);
          //stroke(0);
          noStroke();
          rect(i * this.w, j * this.w, this.w, this.w);
        }
      }
    }
  }