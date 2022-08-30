import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next"

import { HomeSidebar, PostListItem } from "../components";
import { getTokenSSRAndCSR } from "../helpers";
import postService from "../service/postService";

export type PostType = {
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  url_imgage: string
  post_content: string
  time_added: string
  status: string
  count: string | null
}

type HomeDataProp = {
  listPosts: PostType[]
  userPosts: PostType[]
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

const Home: HomeProps = ({ listPosts, userPosts }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts} />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProp> = async (context) => {
  const ctx = context as NextPageContext
  const [token, userToken] = getTokenSSRAndCSR(ctx)

  const listPostsRespone = postService.getPostsPaging();
  const userPostsRespone = postService.getPostsByUserId()
  const props = {
    listPosts: [],
    userPosts: []
  }

  return {
    props
  }
}

export default Home