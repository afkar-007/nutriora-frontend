

async function postPersonalDetails(details) {
    console.log(details);
    
    
   const response = await fetch("https://route66-backend-1-v5us.onrender.com/details/personalDetails",{
        method:"POST",
          headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify(details)

    })
 
    const getData = await response.json()

    return{
        ok:response.ok,
        message:getData.message
    }




    
}



export default postPersonalDetails