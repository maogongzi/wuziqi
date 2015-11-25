window.addEventListener('load', function() {
  var table = new Table({
    rows: 15,
    onChange: function(cells) {
      // console.table(cells);
      // render table view
    },
    onWin: function(winner, result) {
      console.log(winner, 'Win', result);
      // show winner and freeze table
    }
  });
  
  table.updateCell(1, 1, 1);
  table.updateCell(2, 2, 1);
  table.updateCell(4, 4, 1);
  table.updateCell(5, 5, 1);
  table.updateCell(6, 6, 1);
  table.updateCell(3, 3, 1);
});
