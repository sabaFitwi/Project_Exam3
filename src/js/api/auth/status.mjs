import { load } from "../../storage/localStorage.mjs";

export const isLoggedIn = () => Boolean(load("token"));

export const profile = () => load("profile");
