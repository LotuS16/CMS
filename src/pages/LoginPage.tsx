import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../supabaseClient"; // Pastikan path sesuai
import { FaEnvelope, FaLock } from "react-icons/fa";
import image from "../assets/afro.png";
import logo from "../assets/white-mediverse.png";
import { CiLogin } from "react-icons/ci";
import TextInput from "../components/TextInput";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmit: SubmitHandler<LoginForm> = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
  
      if (error) {
        console.error("Supabase Error:", error.message);
        setError(error.message || "Email atau kata sandi salah");
      } else {
        // Simpan token ke localStorage atau sessionStorage
        if (data.session) {
          console.log("Session data:", data.session?.access_token);
          localStorage.setItem("access_token", data.session.access_token);
          localStorage.setItem("user", JSON.stringify(data.session.user));
        }else {
          console.error("Session is undefined");
        }
        window.location.href = "/dashboard"; // Redirect jika berhasil
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Bagian Kiri - Form Login */}
      <div className="flex flex-col justify-center items-center px-10 bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
        <p className="text-gray-600 mt-2 text-center">
          Masuk dan kelola dashboard Mediverse Anda sekarang
        </p>
        <form className="w-full max-w-md mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Input Email */}
          <div className="relative mb-4">
            <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            error={error && !email ? error : ""}
          />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Input Password */}
          <div className="relative mb-2">
            <div className="relative mb-4">
            <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            type="password"
            label="Password"
            icon={<FaLock />}
            error={error && !password ? error : ""}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div></div>
          <p className="text-sm text-right text-gray-500 cursor-pointer hover:underline">
            Lupa Kata Sandi?
          </p>
          

          {/* Tombol Masuk */}
          <div className="flex justify-end">
          <button 
            type="submit"
            className="w-2/3 mt-6 bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-x-3"
            disabled={loading}
          >
            {loading ? "Loading..." : "MASUK SEKARANG"}
            <CiLogin />
          </button>
          </div>
          
        </form>
      </div>

      {/* Bagian Kanan - Banner */}
      <div className="hidden md:flex flex-col justify-between items-center bg-gradient-to-b from-purple-700 to-purple-900 text-white p-10 m-5 rounded">
        <img src={logo} alt="logo" className=" w-50 object-fill"/>
        <img src={image} alt="Mediverse" className="w-80 mt-4" />
        <h2 className="text-3xl font-extralight text-center pb-10">
          Your Personal<br></br> Healthcare Assistant
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;
