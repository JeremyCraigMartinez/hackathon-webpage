jQuery(document).ready(function() {
    setInterval("showNewCommands()", 1000);
});

function showNewCommands() {
  $.ajax({
    url: "http://104.236.169.12:5024/webpage",
  }).done(function(data) {
    if (data != null) {
      for (each in data){
        for (key in data[each]){
          $("#feed").prepend(document.createTextNode(key+" : "+data[each][key]+"\n"));
        }
      }
    }
  });
}

