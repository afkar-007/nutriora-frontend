

async function postPersonalDetails(details) {
    console.log(details);
    
    
   const response = await fetch("http://localhost:3000/details/personalDetails",{
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