import { useState } from "react";
import Button from "./button";

export default function ResetPassForm() {
    const [email, setEmail] = useState("")

    return(
        <div>
            <div className="flex flex-col gap-2 mb-5">
                <span className="text-xl font-bold">Lupa Password ?</span>
                <span className="text-xs">Silahkan masukkan email anda</span>
            </div>
            <form>
                <div className="mb-6">
                    <label 
                            for="email" 
                            className="
                                        block 
                                        mb-2 
                                        text-sm 
                                        font-medium 
                                        text-gray-900 
                            "
                    >
                        Email
                    </label>
                    <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                        block 
                                        w-full 
                                        p-2 
                                        text-gray-900 
                                        border 
                                        border-gray-300 
                                        rounded-lg 
                                        bg-gray-50 
                                        sm:text-xs 
                                        focus:ring-blue-500 
                                        focus:border-blue-500
                            "
                            required

                    />
                </div>
                <div>
                    <Button title="Reset Password" />
                    {/* <LoadingButton /> */}
                </div>
            </form>
        </div>

    )
}