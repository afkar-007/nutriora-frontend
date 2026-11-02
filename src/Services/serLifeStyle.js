async function LifeStylePost(data) {
  const response = await fetch(
    "https://route66-backend-1-v5us.onrender.com/details/LifeStyle",
    {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const getData = await response.json();

  return {
    ok: response.ok,
    message: getData.message,
  };
}


export default LifeStylePost