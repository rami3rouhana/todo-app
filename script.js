
$(document).ready(function () {
    var deleteId
    var status
    var tasks
    var newName
    var stat
    var lists
    var table = document.getElementById("table")
    var btn1 = '<button style = "margin-right: 4px" type="button" class="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target="#edit" >Edit</button>'
    var btn2 = '<button type="button" class="btn btn-danger delete-button" data-bs-toggle="modal" data-bs-target="#delete">Delete</button></td></tr>'
    var html = ''
    var next

    var form = document.getElementById("Edit-Form");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);

    const update = async () => {
        lists = await fetch("http://127.0.0.1:6969/")
        lists = await lists.json()
        for (const list in lists) {
            html = html + "<tr><td>" + lists[list].task + "</td><td>"
            if (lists[list].status == true) {
                html = html + '<div class="badge bg-success status">Done</div></td><td>'
            }
            else {
                html = html + '<div class="badge bg-danger status">Not Done</div></td><td>'
            }
            html = html + btn1
            html = html + btn2
        }
        html = html + '<td><td><button type="button" class="btn btn-primary btn-sm add-button" data-bs-toggle="modal" data-bs-target="#adds">Add Task</button></td></tr>'
        table.innerHTML = html
    }

    $(document).on('click', ".add-button", function (e) {
        tasks = ($(e.target).parent().parent().children(":first-child"))
    })

    $(document).on('click', ".edit-button", function (e) {
        status = ($(e.target).parent().parent().children(":first-child").next())
        tasks = ($(e.target).parent().parent().children(":first-child"))
        document.getElementById("name").value = ($(e.target).parent().parent().children(":first-child").text())
        if (status.text().includes("Done")) {
            document.querySelector('.check-status').click();
        }
    });
    $(document).on('click', ".delete-button", function (e) {
        deleteId = $(e.target).parent().parent()

    });
    $(".confirm").click(function (e) {
        deleteId.remove();
        remove()
    });
    const remove = async () => {
        await fetch("http://127.0.0.1:6969/hard", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": deleteId.children(":first-child").text() })

        })
    }
    const change = async () => {
        await fetch("http://127.0.0.1:6969/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: data

        })
    }
    const add = async () => {
        await fetch("http://127.0.0.1:6969/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data

        })
    }
    $(".add-task").click(function (e) {
        addName = document.getElementById("nam").value

        stat = "false"
        data = JSON.stringify({
            name: addName
        })
        const test = add();

    })
    $(".save-change").click(function (e) {
        newName = document.getElementById("name").value
        e.preventDefault();

        if (document.querySelector('.check-status').checked) {
            status.html("<div>Done</div>")
            status.children(":first-child").addClass("badge bg-success status")
        }
        else {
            status.html("<div>Not done</div>")
            status.children(":first-child").addClass("badge bg-danger status")
        }
        if (status.text() == "Done") {
            stat = true
        }
        else {
            stat = false
        }


        data = JSON.stringify({
            'oldName': tasks.text(),
            'newName': newName,
            'status': stat
        })
        tasks.text(newName)
        const test = change();

    })
    update()
}); 