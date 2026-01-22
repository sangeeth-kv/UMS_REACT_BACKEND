import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    useEffect(() => {
    if (!token) {
      navigate("/invalid-link");
    }
    }, [token, navigate]);

    

    const handleSubmit=async (e) => {
        e.preventDefault();
        setError("");
        if (password.length < 8) {
            return setError("Password must be at least 8 characters");
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try{
            setLoading(true)
            // const response=await verifyResetPassword(password,confirmPassword)
            // console.log("response data in handleSubmit : ",response)

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

        
    }


    if(loading){
        return <Spinner/>
    }

  return (
     <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Reset Password
          </h1>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Enter your new password below
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded">
              {error}
            </div>
          )}

          

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

        </div>
      </div>
  )
}

export default ResetPassword