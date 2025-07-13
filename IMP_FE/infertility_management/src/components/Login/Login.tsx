import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/main.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LoginUser } from "../../service/userService"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../store/userSlice";
import Cookies from "js-cookie";

interface FormState {
  name?: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");
  const location = useLocation(); // 👈 get location from react-router-dom
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // Detect URL hash when the page loads
  useEffect(() => {
    if (location.hash === "#register") {
      setType("signUp");
    } else {
      setType("signIn");
    }
  }, [location]);

  const [signInState, setSignInState] = useState<FormState>({ email: "", password: "" });
  const [signUpState, setSignUpState] = useState<FormState>({ name: "", email: "", password: "" });

  const handleTypeChange = (formType: "signIn" | "signUp") => {
    if (type !== formType) {
      setType(formType);
    }
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInState(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpState(prev => ({ ...prev, [name]: value }));
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const { email, password } = signInState;
      const response = await LoginUser(email, password);
      if(response){
        toast.success("Login successful!");
        dispatch(setUserRedux(response))
        Cookies.set("user", JSON.stringify(response), { expires: 7 });
        if(response.roleId=== "2"){
          navigate("/manager/doctor")
        }else if(response.roleId === "1"){
          navigate("/admin")
        }else{
          navigate("/"); 
        }
        
      }else{
        toast.error("Login failed. Please check your credentials.");
      }
    }catch(error){
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`You are sign up with name: ${signUpState.name}, email: ${signUpState.email} and password: ${signUpState.password}`);
    setSignUpState({ name: "", email: "", password: "" });
  };

  const containerClass = `container ${type === "signUp" ? "right-panel-active" : ""}`;

  return (
    <div className="login-wrapper">
      <div className={containerClass} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" value={signUpState.name} onChange={handleSignUpChange} />
            <input type="email" name="email" placeholder="Email" value={signUpState.email} onChange={handleSignUpChange} />
            <input type="password" name="password" placeholder="Password" value={signUpState.password} onChange={handleSignUpChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
            </div>
            <span>or use your account</span>
            <input type="email" name="email" placeholder="Email" value={signInState.email} onChange={handleSignInChange} />
            <input type="password" name="password" placeholder="Password" value={signInState.password} onChange={handleSignInChange} />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => handleTypeChange("signIn")}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => handleTypeChange("signUp")}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
