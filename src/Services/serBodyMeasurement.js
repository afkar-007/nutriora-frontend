async function BodyMeasurementPost(data) {
  const response = await fetch(
    "https://nutriora-backend.onrender.com/details/BodyMeasurement",
    {
      method: "POST",
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

export default BodyMeasurementPost;
