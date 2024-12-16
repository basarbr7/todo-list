
let input = document.querySelector(".input_field .js_input");
let due_date = document.querySelector(".input_field .due_date")
let add = document.querySelector(".input_field button");
let ul = document.querySelector(".ul_container");

let updateLi = null;


function validation(){
    if(input.value.trim() === "" ){
        alert("This field is required.....")
        input.focus();
        return false;
    }
    else if(due_date.value.trim() === ""){
        alert("Date is required..")
        return false;
    }
    return true;
}



function addtodo(){
    
    if(!validation()) return;

    if(updateLi){
        updateLi.children[0].textContent = input.value.trim()
        updateLi.children[1].textContent = due_date.value.trim()
        updateLi= null;
        console.log(updateLi)
        add.textContent = "Add"
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = `<div>${input.value}</div> <div>${due_date.value}</div> <div class="iconDiv"><i class="fa-regular fa-pen-to-square edit"></i><i class="fa-solid fa-trash delete"></i></div>`;
        ul.appendChild(li)
    }
    savedata()
    input.value="";
    due_date.value="";
}



input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
        addtodo();
    }
})
due_date.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
        addtodo();
    }
})




ul.addEventListener("click", (event)=>{
    
    if(event.target.tagName==="LI"){

        const p = event.target.children[0]
        const date = event.target.children[1]
        
        p.classList.toggle("lineThrough")
        date.classList.toggle("lineThrough")

        let editIcon = event.target.querySelector(".edit")
        if(p.classList.contains("lineThrough")){
            editIcon.style.display= "none"
        }else{
            editIcon.style.display= "block"
        }
        // editIcon.style.display = p.classList.contains("lineThrough") ? "none" : "block";
    }
    else if(event.target.classList.contains("delete")){
        let userconfirm = confirm("Do you want to delete..")
        if(userconfirm){
            event.target.closest("li").remove();
        }
    }
    else if (event.target.classList.contains("edit")){
        updateLi = event.target.closest("li");
        console.log(updateLi)
        input.value = updateLi.children[0].textContent.trim()
        due_date.value = updateLi.children[1].textContent
        add.textContent = "Update"
    }
    savedata()
});







function savedata(){
    localStorage.setItem("todo", ul.innerHTML)
}

function showdata(){
    ul.innerHTML = localStorage.getItem("todo") || ""
}
showdata()