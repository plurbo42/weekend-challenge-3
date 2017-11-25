console.log('js loaded');

$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    getList();
    getCountIncomplete();
    $('#newTaskButton').on('click', addTask);
};

function getList() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('successful get list', response)
            appendList(response);
        }
    })
}


function getCountIncomplete() {
    $.ajax({
        method: 'GET',
        url: '/todo/incomplete',
        success: function (response) {
            $('#incompleteTasks').append('<h3>Incomplete Tasks: ' + response.count + '</h3>')
        }
    })
}

function addTask(){
    console.log('in add task')
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: {
            detail: $('#taskIn').val(),
            type: $('#typeIn').val(),
            priority: $('#priorityIn').val(),
            startdate: $('#startIn').val(),
            duedate: $('#dueIn').val()
        },
        success: function (response){
            console.log('successful post');
            getList();
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

function appendList(array) {
    console.log('in appendList ', array);
    $('#todoList').empty();
    for (var i = 0; i < array.length; i++) {
        var currentItem = array[i];
        //create data row
        var $todoLine = $('<tr class=todoRow></tr>');
        $todoLine.data('id', currentItem.itemid);
    
        //append info to row
        var $todoDetail = $('<td class=detail>' + currentItem.detail + '</td>');
        $($todoLine).append($todoDetail);

        var $todoItemType = $('<td class=itemType>' + currentItem.itemtype + '</td>');
        $($todoLine).append($todoItemType);

        var $todoPriority = $('<td class=priority>' + currentItem.priority + '</td>');
        $($todoLine).append($todoPriority);

        var $todoStartdate = $('<td class=startdate>' + currentItem.startdate + '</td>');
        $($todoLine).append($todoStartdate);

        var $todoDueDate = $('<td class=duedate>' + currentItem.duedate + '</td>');
        $($todoLine).append($todoDueDate);

        var $todoIsComplete = $('<td class=iscomplete></td>');
        $todoIsComplete.data('id', currentItem.id);
        $todoIsComplete.data('iscomplete', currentItem.iscomplete);
        $($todoLine).append($todoIsComplete);

        //append row to DOM
        $('#todoList').append($todoLine);
    }

}
