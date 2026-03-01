const readBtn = document.getElementById('read');
const createBtn = document.getElementById('create');
const parentContainer = document.getElementById('parent-container');
const addContainer = document.getElementById('add-container');
const createSend = document.getElementById('create-send');

const deleteBtn = document.getElementById('delete');
const deleteSend = document.getElementById('delete-send');

const updateBtn = document.getElementById('update');
const updateSend = document.getElementById('update-send');

const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const url = 'http://localhost:8008/db.php';

updateBtn.addEventListener("click", function(){
  document.getElementById("update-container").style.display = 'flex';   
});

async function updateData(url, data){
  try{
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

   if(!response.ok) { console.error(response.status); }
   const r = await response.json();
   console.log(r);
  }catch(error){
    console.error(error);
  }
}

updateSend.addEventListener("click", () => {
  const data = {id: document.getElementById('update-id').value ,column: document.getElementById('column').value, value: document.getElementById('value').value};
  updateData(url, data);
});


deleteBtn.addEventListener("click", function(){
  document.getElementById('delete-container').style.display = 'flex';
});

async function deleteData(url, data){
  try{
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

   if(!response.ok) { console.error(respose.status); }
   const r = await response.json();
   console.log(r);
  }catch(error){
    ;console.error(error);
  }
}

deleteSend.addEventListener("click", () => {
  const data = {id: document.getElementById('delete-id').value};
  deleteData(url, data);
});

createBtn.addEventListener("click", function(){
  addContainer.style.display = 'flex';  
});

async function createData(url, data){
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });

    if(!response.ok){
      console.error(response.status);
    }

    const result = await response.json();
    console.log(result);
  } catch(error){
  console.error(error);
}

}
createSend.addEventListener("click", () => {
  
  const data = {id: 3, first_name: fname.value, last_name: lname.value, email: email.value, phone: phone.value};
  createData(url, data) 
});


async function readData(){
  try{  
  
  const response = await fetch("db.php?type=*");
  const data = await response.json();

  parentContainer.innerHTML = "";
  for(let i = 0; i < data.length; i++){
    const child = document.createElement('div');
    child.innerHTML = `<div>
    <span>No. ${data[i].id}</span>
    <span>${data[i].first_name}</span>
    <span>${data[i].last_name}</span>
    <span>${data[i].email}</span>
    <span>${data[i].phone}</span>
    </div>`;
    parentContainer.appendChild(child);
  }
  }catch(error){
    console.error(error);
  }
  

}

readBtn.addEventListener("click", readData);
