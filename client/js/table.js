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
    if(!this.cells[y][x]) {
      this.cells[y][x] = i;
      
      this.scanCell(x, y);
      
      this.onChange(this.cells);
    }else {
      return new Error('Cell (' + x + ', ' + y + ') is not empty!');
    }
  };
  // scan cell (x, y), check win or not
  Table.prototype.scanCell = function(x, y) {
    var item = this.cells[y][x];
    var len = this.rows;
    
    if(!item) { // cell is empty
      return;
    }
    /*
    | 0 | 1 | 2 |
    | 3 | 4 | 5 |
    | 6 | 7 | 8 |
    */
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
            && x + i <= len
            && y + j >= 0
            && y + j <= len) {
          matrix[j + 1][i + 1].same = this.cells[y + j][x + i] === item;
          
          if(matrix[j + 1][i + 1].same
              && !(i == 0 && j == 0)
              && matrix[j + 1][i + 1].valid) {
            matrix[1 - j][1 - i].valid = false;
            
            var result = this.checkDirection(x, y, i, j, item);
            
            if(result >= 5) {
              console.log(item, 'Win', result);
              return result;
            }
          }
        }
      }
    }
  };
  // check direction (i, j) of (x, y)
  Table.prototype.checkDirection = function(x, y, i, j, item) {
    var sum = 2;
    var len = this.rows;
    
    var tickA = 2;
    while(x + i * tickA >= 0
        && x + i * tickA < len
        && y + j * tickA >= 0
        && y + j * tickA < len) {
      var nextItem = this.cells[y + j * tickA][x + i * tickA];
      
      if(nextItem === item) {
        sum++;
      }
      
      tickA++;
    }
    
    var tickB = 2;
    while(x - i * tickB >= 0
        && x - i * tickB < len
        && y - j * tickB >= 0
        && y - j * tickB < len) {
      var prevItem = this.cells[y - j * tickB][x - i * tickB];
      
      if(prevItem === item) {
        sum++;
      }
      
      tickB++;
    }
    
    return sum;
  };
  
  return Table;
})();
