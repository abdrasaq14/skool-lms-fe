/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import axiosInstance from "../../utils/axiosInstance";
  import { login } from "../../states/userDetails/userDetailsSlice";

  interface ProtectedRouteChildren {
    children: ReactNode;
  }
 
  
  export function ProtectedRoute({ children }: ProtectedRouteChildren) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/");

    }
  
    useEffect(() => {

      async function checkToken() {

        try{
        const res = await axiosInstance.get("/protected-route");

        if (res.data.noTokenError ||
            res.data.TokenExpiredError ||
            res.data.verificationError)
         {
          localStorage.removeItem("token");
          navigate("/login");
        } 
        
        else if (res.status === 200 && res.data.user) {
          
          dispatch(login(res.data.user));
          
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/login");

      }
      }

      checkToken();
    }, []);
    
  
    return (

        <>{children}</>
      
    );
  }