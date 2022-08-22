import api from "./api";

const userService = {
    getUserID: async (userId: string) => {
        return api.callJson(`/member/member.php?userid=${userId}`)
    }
}

export default userService