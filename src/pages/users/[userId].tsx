import { UserDetailInfo, UserDetailPosts } from "../../components";

export default function UserDetail() {
    return (
        <div className="container">
            <UserDetailInfo />

            <UserDetailPosts />
        </div>
    )
}