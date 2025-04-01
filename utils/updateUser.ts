import { User } from "@/interfaces/User";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default async function updateUser(user: User | null | undefined) {
    if (!user) {
        return;
    }

    try {
        await axios.post("/api/user-update", user);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data.message || error.message);
            toast.error(error.response?.data.message || error.message, {
                className: "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
            });
        } else if (error instanceof Error) {
            console.log(error.message);
            toast.error(error.message, {
                className: "bg-black text-white xl:max-w-[24rem] xl:w-[24rem]",
            });
        }
    }
}
