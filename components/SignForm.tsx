"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import LogupForm from "./LogupForm";

export default function SignForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div className="mb-16 w-[32rem] max-w-[32rem]">
            <div className="flex items-center  gap-4 lg:gap-6 justify-center mb-4 lg:mb-8">
                <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={` py-2 px-8 text-lg md:text-2xl border border-gray-200 rounded-lg hover:bg-black hover:text-white  duration-150 ${
                        isLogin && "bg-black text-white"
                    }`}
                >
                    Giriş Yap
                </button>
                <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={` py-2 px-8 text-lg md:text-2xl border border-gray-200 rounded-lg hover:bg-black hover:text-white  duration-150 ${
                        !isLogin && "bg-black  text-white"
                    }`}
                >
                    Kayıt Ol
                </button>
            </div>
            <div className="border inputs flex flex-col gap-3 px-2 py-2">
                {isLogin && <LoginForm></LoginForm>}
                {!isLogin && <LogupForm></LogupForm>}
            </div>
        </div>
    );
}
