async function register(name, email, confirmPassword) {
  const details = {
    name: name,
    email: email,
    password: confirmPassword,
  };
  console.log(details);

  const post = await fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  const data = await post.json();

  console.log(data);

  return {
    ok: post.ok,
    message: data.message,
  };
}

export default register;
