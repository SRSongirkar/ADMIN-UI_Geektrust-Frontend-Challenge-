console.log("script loaded!!")

//create a function to fetch data from the API
async function fetchData(){
    try{
        const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const data = await res.json();
        //console.log(data.length);
        return data;
    }
    catch(err){
        return null;
    }
}

// let dataLength = fetchData();
// console.log(dataLength);
//Create a function to add data into the table
function addDataToTable(data){
    let tableData = document.getElementById("table-body");

    data.forEach((element) => {
        //create a row to insert data
        let newRow = document.createElement("tr");
        newRow.setAttribute("class", "rows");

        //create a table data element for checkbox
        let td1 = document.createElement("td");
        td1.innerHTML = `<input type= "checkbox" class="select-option" onchange="isChecked()"/>`;
        newRow.append(td1);

        //create a table data element for name
        let td2 = document.createElement("td");
        td2.setAttribute("id", "name");
        td2.innerHTML = element.name;
        newRow.append(td2);

        //create a table data element for email
        let td3 = document.createElement("td");
        td3.setAttribute("id", "email");
        td3.innerHTML = element.email;
        newRow.append(td3);

        //create a table data element for role
        let td4 = document.createElement("td");
        td4.setAttribute("id", "role");
        td4.innerHTML = element.role;
        newRow.append(td4);

        //create a table data element for role
        let td5 = document.createElement("td");
        td5.innerHTML = `<div class="d-flex justify-content-center">
                <div><i class="fa-solid fa-pen-to-square pe-2 pt-1" onclick = "editRowData()" title="edit"></i></div>
                <div><i class="fa-solid fa-bookmark pe-2 pt-1" style="display:none" onclick = "saveRowData()" title="save"></i></div>
                <div><i class="fa-solid fa-trash" onclick = "deleteParticularRow()" title="delete"></i></div>
                </div>`;
        newRow.append(td5);
        //append the newRow into the table body
        tableData.append(newRow);
    });
}  
  
//Create a promise to resolve `fetchData`
const data = new Promise((resolve, reject) => {
    try {
      resolve(fetchData());
    } catch (ex) {
      reject(ex);
    }
});
  
console.log(data);
  
//Consume the promise and use addDataToTable(data)
//Function to add the data value resolved to table.
data
    .then((res) => {
      addDataToTable(res);
    })
    .catch((err) => {
      console.log(err);
});
  
// create a function to change the background of the row, when row is checked
function isChecked() {
    let check = document.querySelectorAll('.select-option');
    // console.log(check);
    check.forEach((e) => {
        if (e.checked) {
            e.parentNode.parentNode.style.background = 'rgb(194, 192, 192)';
       } else {
            e.parentNode.parentNode.style.background = 'white';
       }
    });
};


//create a function to select multiple checkbox from one checkbox
function selectAllCheckbox(master, cn){
    const checkboxOption = document.getElementsByClassName(cn);
    for(let i=0; i<checkboxOption.length; i++){
        checkboxOption[i].checked = master.checked;
    }
    isChecked();
}

// selectAllCheckbox(checkboxAll, "select-option");


// create a function to delete the Selected rows at once from the table
function deleteRow() {
    const selectedRows = document.querySelectorAll('#table-data .select-option:checked');
    alert("Are You Sure, You want to delete.");
    selectedRows.forEach(e => {
        e.parentNode.parentNode.remove();
    })
};

//create function to delete the selected row specifically
function deleteParticularRow(){
    const selectedRow = document.querySelector('#table-data .select-option:checked');
    alert("Are You Sure, You want to delete.");
    selectedRow.parentNode.parentNode.remove();
    
};


//create a function to edit the data of the selected row
function editRowData(){
    const selectRow = document.querySelectorAll('#table-data .select-option:checked');
    alert("Are You Sure, You want to edit data.");
    console.log(selectRow);

    selectRow.forEach(() => {

        const editRow = document.querySelector(".fa-pen-to-square");
        editRow.style.display="none";
        
        const saveRow = document.querySelector(".fa-bookmark");
        saveRow.style.display = "block";

        let name=document.getElementById("name");
        let email=document.getElementById("email");
        let role=document.getElementById("role");


        name.innerHTML=`<input type='text' id='name_text' placeholder='name_data'>`;
        email.innerHTML=`<input type='text' id='email_text' placeholder='email_data'>`;
        role.innerHTML=`<input type='text' id='role_text' placeholder='role_data'>`;
    });
    
};

function saveRowData(){
    const selectRow = document.querySelectorAll('#table-data .select-option:checked');
    alert("Are You Sure, You want to save data.");
    console.log(selectRow);

    
        let name_val=document.getElementById("name_text").value;
        let email_val=document.getElementById("email_text").value;
        let role_val=document.getElementById("role_text").value;

        document.getElementById("name").innerHTML=name_val;
        document.getElementById("email").innerHTML=email_val;
        document.getElementById("role").innerHTML=role_val;

        const editRow = document.querySelector(".fa-pen-to-square");
        editRow.style.display="block";
        const saveRow = document.querySelector(".fa-bookmark");
        saveRow.style.display = "none";
       
    
};


// create a function to search by name, email or role
function searchPerson(){

  let input = document.getElementById("myInput");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("table-data");
  let tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
      let tds = tr[i].getElementsByTagName("td");
      let value = false;
      for(let j = 0; j < tds.length; j++){
          let td = tds[j];
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              value = true;
            } 
        }
        if(value){
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
};




