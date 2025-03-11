import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthProvider } from "../../context/AuthProvider";


const LoginPage = () =>{
    return (
      <AuthProvider>
        <div className="min-h-[500px] w-full flex justify-center items-center">
          <div className="relative h-[400px] w-[500px] rounded-xl bg-tm-custom before:absolute before:inset-0 before:bg-black/50 before:z-0">
            <div className="relative z-10">
              <LoginForm />
            </div>
          </div>
        </div>
      </AuthProvider>
    );
  };
  
export default LoginPage;

