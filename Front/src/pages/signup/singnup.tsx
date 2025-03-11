import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { AuthProvider } from "../../context/AuthProvider";

const RegisterPage = () => {
  return (
    <AuthProvider>
      <div className="w-full flex justify-center items-center">
        <div className="mt-20 relative h-auto w-[500px] rounded-xl bg-tm-custom before:absolute before:inset-0 before:bg-black/50 before:z-0">
          <div className="relative z-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default RegisterPage;
