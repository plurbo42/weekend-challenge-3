console.log('js loaded');

$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    getList();
    $('#addTask').hide();
    getCountIncomplete();
    $('#newTaskButton').on('click', addTask);
    $('#showNewTask').on('click', showNewTask);
    $('#todoList').on('click', '.markComplete', markComplete);
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
};

function getCountIncomplete() {
    $.ajax({
        method: 'GET',
        url: '/todo/incomplete',
        success: function (response) {
            $('#incompleteTasks').empty();
            $('#incompleteTasks').append('<h3>Incomplete Tasks: ' + response.count + '</h3>')
        }
    })
};

function addTask() {
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
        success: function (response) {
            console.log('successful post');
            getList();
            //hide new task form and clear inputs
            $('#addTask').hide();
            $('#taskIn').val('');
            $('#typeIn').val('');
            $('#priorityIn').val('');
            $('#startIn').val('');
            $('#dueIn').val('');
        }
    })
};

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

        //add mark complete button to incomplete tasks
        if (currentItem.iscomplete == false) {
            var $todoIsComplete = $('<td class=iscomplete><button class="markComplete">Mark Complete</button></td>');
        } else {
            var $todoIsComplete = $('<td class=iscomplete></td>')
        }
        $todoIsComplete.data('id', currentItem.itemid);
        $todoIsComplete.data('iscomplete', currentItem.iscomplete);
        $($todoLine).append($todoIsComplete);

        var $todoDelete = $('<td class=deleteTask><button class="deleteButton">Delete</button></td>');
        $($todoLine).append($todoDelete);

        //append row to DOM
        $('#todoList').append($todoLine);

    }

};

function showNewTask() {
    console.log('in show new task');
    $('#addTask').toggle();
};

function markComplete() {
    var completeId = $(this).parent().data().id;
    console.log('in markComplete for id ', completeId);
    $.ajax({
        method: 'PUT',
        url: '/todo/' + completeId,
        success: function (response) {
            console.log('successful mark complete');
            getList();
            getCountIncomplete();
        }
    })
};