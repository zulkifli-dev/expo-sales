import { SalesmanAttributes } from "./order";

export type UserDataType = {
    jwt: string | null;
    user?: ProfileType
};

export type ProfileType = {
    blocked: boolean,
    email: string,
    username: string,
    salesman: SalesmanAttributes
};

