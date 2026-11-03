

async function postPersonalDetails(details) {
    
    
    
   const response = await fetch("https://nutriora-backend.onrender.com/details/personalDetails",{
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