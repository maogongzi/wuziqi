var Table = (function() {
  function Table(config) {
    if(!config.rows
        || config.rows < 5) {
      throw new Error('Rows: ' + config.rows + ' not OK!');
      
      return;
    }
    
    this.rows = config.rows
        || 15;
    this.onChange = config.onChange
        || function() {};
    this.onWin = config.onWin
        || function() {};
        
    this.winner = 0;
    
    this.cells = [];
    
    this.init();
  }
  
  // create empty cells
  Table.prototype.init = function() {
    var len = this.rows;
    
    for(var i = 0; i < len; i++) {
      var row = [];
      
      for(var j = 0; j < len; j++) {
        row.push(0);
      }
      
      this.cells.push(row);
    }
    
    this.onChange(this.cells);
  };
  // update cell
  Table.prototype.updateCell = function(x, y, i) {
    if(this.winner) {
      throw new Error('Game over, can\'t move anymore!');
      return;
    }
    if(!this.cells[y][x]) {
      this.cells[y][x] = i;
      
      this.onChange(this.cells);
      
      this.scanCell(x, y);
      return true;
    }else {
      throw new Error('Cell (' + x + ', ' + y + ') is not empty!');
      return;
    }
  };
  // scan cell (x, y), check win or not
  Table.prototype.scanCell = function(x, y) {
    var item = this.cells[y][x];
    var len = this.rows;
    
    if(!item) { // cell is empty
      return;
    }
    
    var matrix = [
      [{
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }],
      [{
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }],
      [{
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }, {
        same: false,
        valid: true
      }]
    ];
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++) {
        if(x + i >= 0
            && x + i < len
            && y + j >= 0
            && y + j < len) {
          matrix[j + 1][i + 1].same = this.cells[y + j][x + i] === item;
          
          if(matrix[j + 1][i + 1].same
              && !(i == 0 && j == 0)
              && matrix[j + 1][i + 1].valid) {
            matrix[1 - j][1 - i].valid = false;
            
            var result = this.checkDirection(x, y, i, j, item);
            
            if(result >= 5) {
              this.winner = item;
              
              this.onWin(item, result);
              
              return result;
            }
          }
        }
      }
    }
  };
  // check direction (i, j) of (x, y)
  Table.prototype.checkDirection = function(x, y, i, j, item) {
    var sum = 1;
    
    sum += this.checkDirA(x, y, i, j, item);
    
    sum += this.checkDirB(x, y, i, j, item);
    
    return sum;
  };
  
  Table.prototype.checkDirA = function(x, y, i, j, item) {
    var sum = 0;
    var len = this.rows;
    
    for(var m = 1; m < len; m++) {
      if(x + i * m >= 0
          && x + i * m < len
          && y + j * m >= 0
          && y + j * m < len) {
        var nextItem = this.cells[y + j * m][x + i * m];
        
        if(nextItem === item) {
          sum ++;
        }else {
          return sum;
        }
      }
    }
    
    return sum;
  };
  
  Table.prototype.checkDirB = function(x, y, i, j, item) {
    var sum = 0;
    var len = this.rows;
    
    for(var m = 1; m < len; m++) {
      if(x + i - m >= 0
          && x - i * m < len
          && y - j * m >= 0
          && y - j * m < len) {
        var prevItem = this.cells[y - j * m][x - i * m];
        
        if(prevItem === item) {
          sum ++;
        }else {
          return sum;
        }
      }
    }
    
    return sum;
  };
  
  return Table;
})();
