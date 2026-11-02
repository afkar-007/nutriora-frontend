async function LoginUser(email, password) {

  const log = {
    email: email,
    password: password,
  };
  console.log(log);
  

  const logUser = await fetch("https://route66-backend-1-v5us.onrender.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(log),
  });

  const response = await logUser.json();

  return {
    ok: logUser.ok,
    message:response.message,
    token: response.token,
    role: response.role,
    id: response.userId,
    profile:response.profile
  };
}


export default LoginUser