import api from "./api";

type RegisterData = {
    email: string
    fullname: string
    password: string
    repassword: string
}

const userService = {
    getUserID: async (userId: string) => {
        return api.callJson(`/member/member.php?userid=${userId}`)
    },
    register: async (data: RegisterData) => {
        return api.callJson("/member/register.php", {
            data,
            method: "POST"
        })
    }
}

export default userService
