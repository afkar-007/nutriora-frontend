async function postNutritionGoals (data) {

    const response = await fetch("http://localhost:3000/details/NutritionGoals",{
        method:"POST",
          headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify(data)

    })

    const getData = await response.json()

    return{
        ok:response.ok,
        message:getData.message
    }


    
}

export default postNutritionGoals