async function LifeStylePost(data) {
  const response = await fetch(
    "http://localhost:3000/details/LifeStyle",
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