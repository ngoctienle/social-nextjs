import { PostItem } from "../../components";
import { PostType } from "../../pages";

type PropsType = {
    listPosts: PostType[];
}

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
    return (
        <div className="ass1-section__list">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />

            <button className="load-more ass1-btn"><span>Xem thêm</span></button>
        </div>
    )
}

export default PostListItem