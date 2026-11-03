import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import LoginUser from "../Services/Login";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const [loading,setLoading]=useState(false)



  // useEffect(()=>{
    
  //   const gateway = localStorage.getItem("userLoggedIn")

    



  //   if(gateway==="true"){
  //     navigate('/personalDetails')
  //   }



  // },[])

  // useEffect(()=>{

  //   const adminGateway = localStorage.getItem("AdminLogin")
  //   const clientGateWay = localStorage.getItem("homePage")
  //   if()
  //   if(adminGateway==="true"){
  //     navigate('/nutritionist')
  //   }


    

  // },[])

  //   useEffect(()=>{
  //   const clientGateWay = localStorage.getItem("homePage")
  //   if(clientGateWay==="true"){
  //     navigate('/clientHome')
  //   }


    

  // },[])







  async function Login(e) {
    try {
      
      setLoading(true)
      
      e.preventDefault();

      if (!email.trim(" ")) {
        setError("Email field is Empty");
        return;
      }
      if (!emailPattern.test(email)) {
        setError("Enter a valid Email");
        return;
      }

      if (!password.trim(" ")) {
        setError("Password field is Empty");
        return;
      }
      setError(null)

      const response = await LoginUser(email, password);

      if (!response.ok) {
        setError(response.message);
        return;
      }

      if (response.ok) {
        
        localStorage.setItem("id",response.id)
        localStorage.setItem("token",response.token)
        localStorage.setItem("role",response.role)
        localStorage.setItem("userLoggedIn",true)
        localStorage.setItem("profile",String(response.profile))
        // localStorage.setItem("AdminLogin", "true");

        // navigate('/personalDetails')
        setEmail("")
        setPassword("")

        const profileGateWay = localStorage.getItem("profile");
        const roleGateway = localStorage.getItem("role")

        console.log(profileGateWay);
        
        if(roleGateway==="admin"){
          navigate("/nutritionist")
          
          
          
          

        }else{
      if (profileGateWay === "true") {
        localStorage.setItem("ClientHome",true)
  navigate("/clientHome", { replace: true });
} else {
  navigate("/personalDetails", { replace: true });
}
        }





      }

     

     console.log(response.id);
           
     console.log(response.token);
     
     console.log(response.role);
     



    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <Link to={'/'} className="auth-logo">
          <span className="logo-icon">N</span>
          Nutriora
        </Link>

        <div className="brand-content">
          <span className="brand-label">YOUR JOURNEY TO BETTER HEALTH</span>

          <h1>
            Nourish your body.
            <br />
            <span>Transform your life.</span>
          </h1>

          <p>
            Your personalized nutrition journey starts here. Connect with
            experts and build healthier habits that last a lifetime.
          </p>
        </div>

        <p className="brand-footer">Wellness, made personal.</p>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <div onClick={()=>navigate('/')} className="mobile-logo">
            <span   className="logo-icon">N</span>
            Nutriora
          </div>

          <div className="auth-heading">
            <span className="auth-eyebrow">WELCOME BACK</span>

            <h2>Sign in to your account</h2>

            <p>Continue your journey toward a healthier you.</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

             {/* ERROR MESSAGE */}
            {error && (
              <div className="register-error" role="alert">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}


            <div className="auth-options">
              <label className="remember-option">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="auth-submit"
              onClick={(e) => Login(e)}
              disabled={loading}
            >
              {loading?"Logining..." :"Sign in"}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>

          <p className="auth-legal">
            By continuing, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
