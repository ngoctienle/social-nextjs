import api from "./api";

const postService = {
    getPostsPaging: async ({pagesize = 3, currPage = 1} = {}) => {
        const params = `pagesize=${pagesize}&currPage=${currPage}`
        const url = `/post/getListPagination.php?${params}`
        return api.callJson(url)
    },
    getPostsByUserId: async ({userid, token}) => {
        const url = `/post/getListPostUserID.php?userid=${userid}`
        return api.callJson(url, {
            token
        })
    }
}

export default postService
