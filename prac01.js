function handleFormSubmit(event){
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value ,
        email: event.target.email.value ,
        phone: event.target.phone.value,
    };
   

    axios.post("https://crudcrud.com/api/75f7e0aba83142d5b267e1d39db432d3/userdetails",userDetails)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    
  // localStorage.setItem(userDetails,JSON.stringify(userDetails));
   displayUserOnScreen(userDetails);
}

   window.addEventListener("contentload",()=>{
        axios.get("https://crudcrud.com/api/a5caff24dd4045e790f5f4738b900dec/userdetails")
        .then((res)=>{
          console.log(res)

          for(var i=0;i<res.data.length;i++){
            displayUserOnScreen(res.data[i])
          }
        })
        .catch((err)=>{
              console.log(err)
        })
      
   })
function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;
    });
  }