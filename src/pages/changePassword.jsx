import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({
    password: "" // Match the backend expected key
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/change-password/${uid}/${token}/`, 
        formData, 
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Password changed successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/360_F_482855164_dW143XvThVRgP1jNP0cbNjcqgpem1KC5.jpg')` }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div 
        className="relative w-96 p-6 rounded-lg shadow-xl text-center z-10 bg-white"
        initial={{ opacity: 0, y: -90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-gray-900 text-2xl font-semibold mt-4">Change Password</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input 
            type="password" 
            name="password" 
            placeholder="New Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400" 
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-800 transition font-semibold" 
            disabled={loading}
          >
            {loading ? "Processing..." : "Change Password"}
          </button>
        </form>
      </motion.div>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
