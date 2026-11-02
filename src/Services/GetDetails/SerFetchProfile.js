async function GetProfile() {
  const id = localStorage.getItem("id");

  const response = await fetch(`http://localhost:3000/details/userGet/${id}`);

  const getData = await response.json();

  return {
    ok: response.ok,
    message: getData.message,
    data: getData.data,
  };
}


export default GetProfile