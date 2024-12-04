function handleFormSubmit(event){
    event.preventDefault();
    const userdetails = {
        username: event.target.username.value ,
        email: event.target.email.value ,
        phone: event.target.phone.value,
    };
   

    axios.post("https://crudcrud.com/api/9bcfdb9188b94e45ac2c29ffc5890d13/userdetails",userdetails)
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
   displayUserOnScreen(userdetails);
}

   window.addEventListener("DOMContentLoaded",()=>{
        axios.get("https://crudcrud.com/api/9bcfdb9188b94e45ac2c29ffc5890d13/userdetails")
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
function displayUserOnScreen(userdetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userdetails.username} - ${userdetails.email} - ${userdetails.phone} `)
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
     axios.delete(`https://crudcrud.com/api/9bcfdb9188b94e45ac2c29ffc5890d13/userdetails/${userdetails._id}`)
        .then((res)=>{
         console.log(res)
         userList.removeChild(event.target.parentElement);
        })
        .catch((err)=>{
          console.log(err)
       })
      
     // localStorage.removeItem(userDetails.email);
    });
  
    editBtn.addEventListener("click", function (event) {
      document.getElementById("username").value = userdetails.username;
        document.getElementById("email").value= userdetails.email;
        document.getElementById("phone").value= userdetails.phone; 


      axios.put(`https://crudcrud.com/api/9bcfdb9188b94e45ac2c29ffc5890d13/userdetails/${userdetails._id}`,
        {
         username:`${userdetails.username}`,
         email:`${userdetails.email}`,
         phone:`${userdetails.phone}`
        }
      )
      .then((res)=>{
        console.log(res)
        userList.removeChild(event.target.parentElement); 
      })
      .catch((err)=>{
        console.log(err)
      })
      
      //localStorage.removeItem(userdetails.email);
      
    });
  }