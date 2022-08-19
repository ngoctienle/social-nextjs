import { getSession, useSession } from "next-auth/react";
import { HomeSidebar, PostListItem } from "../components";

const Home = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div className="flex justify-center items-center mt-10">
      <h1 className="text-orange-400 text-base">
        Login to see more information ố là la
      </h1>
    </div>
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem />
        </div>
        <div className="col-lg-4">
          {session.user.name}
          { }
          <img src={session.user.image} alt="" className="w-[25px] h-[25px] object-cover" />
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
