

function awesome_all(callback) {
    $.ajax({
        url: '/awesome/v2/all',
        type: 'GET',
        success: callback,
        statusCode: {
          500: function() {
            alert("REDIS is not available!");
          }
        }
    });
}

function awesome_set(key, value, callback) {
    $.ajax({
        url: '/awesome/v2/' + key + "/" + value,
        type: 'PUT',
        dataType: "json",
        success: callback,
        statusCode: {
          500: function() {
            alert("REDIS is not available!");
          }
        }
    });
}


function get_all() {
    console.log("GET ALL");
    awesome_all(function(data) {
      for (var el in data.data) {
        console.log(el);
        view_key (el, data.data[el]);
      };
    });
}

function view_key (key, value) {
    if($("#id_"+ key).length > 0) {
      console.log("has");
      $("#id_" + key + "_value").html(value);
    } else {
      $("#keys").append("<li id='id_" + key + "'><b>" + key + "</b> <span id='id_" + key + "_value' >" + value + "</span></li>");
    }
    Materialize.fadeInImage("#id_"+ key);
}

function set_key() {
    var key = $('#set_key').val();
    var value = $('#set_value').val();
    if(!(key && value)) {
      alert("A key need a value, fill in all fields!");
    }
    console.log("SET KEY:", key, value);
    awesome_set(key, value, function(data) {
      console.log(data);
      if(data.error) {
        alert("Error setting: " + key + " Issue: " + data.error);
      }
      view_key (key, value);
      $('#set_key').val("");
      $('#set_value').val("");
      Materialize.updateTextFields();
    });
    return false;
};

$( document ).ready(function() {
    get_all();

});