
$(document).ready(function () {
    var deleteId
    var status
    var tasks
    var newName 
    var stat
    var lists
    var table = document.getElementById("table")
    var btn1= '<button style = "margin-right: 4px" type="button" class="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target="#edit" >Edit</button>'
    var btn2= '<button type="button" class="btn btn-danger delete-button" data-bs-toggle="modal" data-bs-target="#delete">Delete</button></td></tr>'
    var html=''
    var next
    
    const update = async () => {
        lists = await fetch("http://127.0.0.1:6969/")   
        lists = await lists.json()
        for (const list in lists) {
            html = html + "<tr><td>"+list+"</td><td>"
            if(lists[list]==true){
                html = html + '<div class="badge bg-success status">Done</div></td><td>'
            }
            else{
                html = html + '<div class="badge bg-danger status">Not Done</div></td><td>'
            }
            html = html + btn1
            html = html + btn2
        }
        table.innerHTML = html   
    }
    update();

    $(document).on('click', ".edit-button",function (e) {
        status = ($(e.target).parent().parent().children(":first-child").next())
        tasks =  ($(e.target).parent().parent().children(":first-child"))
        document.getElementById("name").value = ($(e.target).parent().parent().children(":first-child").text())
        if(status.text().includes("Done")){
            document.querySelector('.check-status').click();
        }
    });
    $(document).on('click', ".delete-button",function (e) {
        deleteId = $(e.target).parent().parent()
        
    });
    $(".confirm").click(function (e) {
        deleteId.remove();
    });

    $(".save-change").click(function (e){
        newName = document.getElementById("name").value 
        if(status=="done"){
            stat="true"
        }
        else{
            stat="false"
        }
        const sec = async () => {await fetch("http://127.0.0.1:6969", {
            method: "PUT",
            contentType:"application/json",
            body: JSON.stringify({
                "oldName":tasks,
                "newName":newName,
                "status":stat
                }),

        })}
            sec();
        if(document.querySelector('.check-status').checked){
            status.html("<div>Done</div>")
            status.children(":first-child").addClass("badge bg-success status")
        }
        else{
            status.html("<div>Not done</div>")
            status.children(":first-child").addClass("badge bg-danger status")
        }
        tasks.text(newName)
    })

}); 