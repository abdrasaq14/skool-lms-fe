/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useEffect, useState, useContext, createContext } from "react";
  import { useNavigate } from "react-router-dom";
  import axiosInstance from "../../utils/axiosInstance";

  interface ProtectedRouteProps {
    children: ReactNode;
  }
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
  }
 
  
  interface AuthContextProps {
    userData?: User;
  }
  const AuthContext = createContext<AuthContextProps>({});
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  
  export function StudentProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User>();
  
    useEffect(() => {
      async function checkToken() {
        const auth = await axiosInstance.get("/protected-routes/students");
        if (
          auth.status === 200 &&
          (auth.data.noTokenError ||
            auth.data.tokenExpiredError ||
            auth.data.verificationError)
        ) {
          navigate("/students/signin");
        } else if (auth.status === 200 && auth.data.student) {
          setUserData(auth.data.student);
        }
      }
      checkToken();
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // check if the token is present and verify it frorm the backend
    const contextValue: AuthContextProps = {
      userData,
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        <>{children}</>
      </AuthContext.Provider>
    );
  }