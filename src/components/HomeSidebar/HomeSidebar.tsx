import { PostType } from "../../pages";

type PropsType = {
    userPosts: PostType[];
}

const HomeSidebar: React.FC<PropsType> = ({ userPosts }) => {
    return (
        <aside className="ass1-aside">
            <div className="ass1-content-head__t">
                <div>Bài viết gần đây của bạn.</div>
            </div>
            <div>Vui lòng đăng nhập để xem nội dung này
                <a href="#">Đăng nhập</a>
            </div>
        </aside>
    )
}

export default HomeSidebar