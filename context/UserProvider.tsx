"use client";

import { type Product } from "@/interfaces/Product";
import { type User } from "@/interfaces/User";
import _ from "lodash";
import { createContext, useReducer } from "react";

type ActionType = keyof User | "setUser" | "logOut" | "paymentOkay";
type PayloadType = string | User | Product[];

interface UserContextInterface {
    user: User | null;
    dispatch: React.ActionDispatch<
        [
            action: {
                type: ActionType;
                payload: PayloadType;
            }
        ]
    >;
}

export const UserContext = createContext<UserContextInterface | null>(null);

function userReducer(
    prevUser: User | null,
    action: {
        type: ActionType;
        payload: PayloadType;
    }
) {
    if (!prevUser || action.type === "setUser") {
        return action.payload as User;
    }
    if (action.type === "logOut") {
        return null;
    }

    const newUser = _.cloneDeep(prevUser);

    if (action.type === "addresses" && typeof action.payload === "string") {
        newUser.addresses.push(action.payload as string);
        return newUser;
    }
    if (action.type === "paymentOkay") {
        newUser.bucket = [];
        return newUser;
    }

    return { ...newUser, [action.type]: action.payload };
}

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, dispatch] = useReducer(userReducer, null);
    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}
