window.addEventListener('load', function() {
  var table = new Table({
    rows: 15,
    onChange: function(cells) {
      console.table(cells);
    }
  });
  
  table.updateCell(1, 1, 1);
  table.updateCell(2, 2, 1);
  table.updateCell(1, 2, 1);
  table.updateCell(3, 3, 1);
  table.updateCell(1, 3, 1);
  table.updateCell(4, 4, 1);
  table.updateCell(1, 4, 1);
  table.updateCell(5, 5, 1);
  table.updateCell(1, 5, 1);
});