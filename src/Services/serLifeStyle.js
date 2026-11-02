async function LifeStylePost(data) {
  const response = await fetch(
    "https://nutriora-backend.onrender.com/details/LifeStyle",
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