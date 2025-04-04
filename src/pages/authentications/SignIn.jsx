import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const redirectHome = () => navigate("/");
  const redirectLogin = () => navigate("/SignIn");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let url, payload;

    if (forgotPassword) {
      url = "http://127.0.0.1:8000/forgot-password/";
      payload = { email: formData.email };
    } else {
      url = isLogin ? "http://127.0.0.1:8000/login/" : "http://127.0.0.1:8000/signup/";
      payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
          };
    }

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (isLogin) {
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

        const { token, user } = response.data; // ✅ Extract from response.data

        if (token && user) {
          const userData = {
            token,
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          };

          // ✅ Store in localStorage
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("user_data", JSON.stringify(userData));
          console.log('login user-data', userData);

          setTimeout(()=>navigate('/'), 2000);
        } else {
          setError("Authentication token or user data is missing.");
        }
        setTimeout(()=>navigate('/'), 2000);
      } else {
        toast.success("Registration successful! Login to continue.", { position: "top-right", autoClose: 3000 });
        redirectLogin();
      }

      console.log("Success:", response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      setError(errorMsg);
      toast.error(errorMsg, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/360_F_482855164_dW143XvThVRgP1jNP0cbNjcqgpem1KC5.jpg')` }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div 
        className="relative w-96 p-6 rounded-lg shadow-xl text-center z-10 "
        initial={{ opacity: 0, y: -90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <img className="w-40 h-30 mx-auto" src="/images/hangout.png" alt="User" />
        <h2 className="text-white text-2xl font-semibold mt-4 ">
          {forgotPassword ? "Forgot Password" : isLogin ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && !forgotPassword && (
            <>
              <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white   focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border focus:outline-none bg-white  focus:ring-2 focus:ring-orange-400" required />
          {!forgotPassword && (
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          )}

          <div className="flex items-center justify-between text-gray-600 text-sm">
            {!forgotPassword && (
              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2 text-white" /> Remember me
              </label>
            )}
            {isLogin && !forgotPassword && (
              <span className="text-orange-500 hover:underline cursor-pointer" onClick={() => setForgotPassword(true)}>Forgot Password?</span>
            )}
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-800 transition font-semibold" disabled={loading}>
            {loading ? "Processing..." : forgotPassword ? "Reset Password" : isLogin ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        {!forgotPassword && (
          <p className="text-orange-500 mt-4 cursor-pointer hover:text-orange-800 transition" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </p>
        )}
        {forgotPassword && (
          <p className="text-orange-500 mt-4 cursor-pointer hover:text-orange-800 transition" onClick={() => setForgotPassword(false)}>
            Back to Login
          </p>
        )}
      </motion.div>
      
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}
