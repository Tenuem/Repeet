import { z } from "zod";
import { useAuthContext } from "../Context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const { loginUser } = useAuthContext();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors, isSubmitting }, setError,} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur', 
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await loginUser(data.username, data.password);
            navigate("/");
        } catch (error: any) {
            console.log(error);
            setError('root', {
                message: error.message || 'Login failed',
            });
            toast.error("Login failed");
        }
    };

  return (
    <div className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col bg-[var(--foreground)] mx-auto 
                rounded-3xl shadow-3xl px-6 pt-6 overflow-clip
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[var(--background)]'">
        <form onSubmit={handleSubmit(onSubmit)} 
            className="space-y-4 md:space-y-6 w-full">
        <div className="w-full">
            <input
                {...register('username')}
                type="text"
                placeholder="Username"
                className="border p-2 w-full bg-[var(--background)] rounded-xl lg:rounded-2xl md:text-xl md:h-14"
            />
            {errors.username && (
                <p className="text-red-500 m-1 text-sm md:text-base ">{errors.username.message}</p>
            )}
        </div>
        
        <div className="w-full">
            <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="border p-2 w-full bg-[var(--background)] rounded-xl lg:rounded-2xl md:text-xl md:h-14"
            />
            {errors.password && (
                <p className="text-red-500 m-1 text-sm md:text-base ">{errors.password.message}</p>
            )}
        </div>
        
        {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        
        <button type="submit" disabled={isSubmitting}
            className="bg-[var(--highlight-mint)] w-full text-white p-2 rounded-xl disabled:opacity-50 hover:cursor-pointer
                lg:rounded-2xl md:text-xl md:h-12">
            {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        </form>
        <div className="text-slate-100/50 flex items-center justify-center w-full my-1 
            text-sm flex-col lg:flex-row
            md:text-lg md:my-2 mb-2 lg:my-4">
            <p className="px-1">Don't have an account yet? </p>
            <p onClick={() => navigate("/register")} className="px-1 hover:scale-105 hover:text-[var(--highlight-fuchsia)] hover:cursor-pointer 
                ">Create one now!</p>
        </div>
    </div>
  );

}
export default LoginPage;