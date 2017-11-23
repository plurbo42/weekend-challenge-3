console.log('js loaded');

$(document).ready(onReady);

function onReady(){
    console.log('jquery loaded');
    getList();
    getCountIncomplete()
};

function getList() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('successful get list', response)
            $('#todoList').empty();
            for (var i = 0; i < response.length; i++) {
                var currentItem = response[i];
                //create data row
                var $todoLine = $('<tr class=todoRow></tr>');
                $todoLine.data('id', currentItem.id);
                $('#todoList').append($todoLine);

                //append info to row
                var $todoItemType = $('<td class=itemType>'+ currentItem.itemtype +'</td>');
                $('.todorow').append('<td class=itemType>'+ currentItem.itemtype +'</td>');

            }
        }
    })
}

function getCountIncomplete(){
    $.ajax({
        method: 'GET',
        url: '/todo/incomplete',
        success: function (response) {
            $('#incompleteTasks').append('<h3>Incomplete Tasks: ' + response.count + '</h3>')
        }
    })
}

// itemid SERIAL PRIMARY KEY,
// itemtype VARCHAR(50),
// priority VARCHAR(50),
// detail VARCHAR(500) NOT NULL,
// startdate DATE, 
// duedate DATE,
// iscomplete BOOLEAN NOT NULL