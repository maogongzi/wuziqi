window.addEventListener('load', function() {
  var table = new Table({
    rows: 15,
    onChange: function(cells) {
      // console.table(cells);
      renderTable(cells);
    },
    onWin: function(winner, result) {
      console.log(winner, 'Win', result);
      // show winner and freeze table
    }
  });
  
  var lastMove = 2; // last is white, start from black
  
  var tableElmt = document.getElementById('table');
  
  tableElmt.addEventListener('click', function(e) {
    var target = e.target;
    
    while(target.tagName
        && target.tagName !== 'TD') {
      if(target.tagName === 'TR'
          || target.tagName === 'TABLE') {
        return;
      }
      target = target.parentNode;
    }
    
    var x = parseInt(target.getAttribute('data-x')),
        y = parseInt(target.getAttribute('data-y'));
    
    if(table.updateCell(x, y, 3 - lastMove)) {
      lastMove = 3 - lastMove;
    }
  });
});

var config = [
  '',
  'black',
  'white'
];

function renderTable(cells) {
  var tableElmt = document.getElementById('table');
  
  tableElmt.innerHTML = '';
  
  var htmlString = '';
  
  for(var i in cells) {
    var row = cells[i];
    
    var tr = '<tr>';
    
    for(var j in row) {
      var cell = row[j];
      
      var td = '<td data-x="'
          + j
          + '" data-y="'
          + i
          + '"><div class="cell '
          + config[cell]
          + '"></div></td>';
      
      tr += td;
    }
    
    tr += '</tr>';
    
    htmlString += tr;
  }
  
  tableElmt.innerHTML = htmlString;
}
