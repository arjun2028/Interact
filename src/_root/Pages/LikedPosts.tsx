import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  console.log(currentUser);
  return (
    <>
      {currentUser?.postsLiked?.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      {console.log(currentUser.postsliked)}
      <GridPostList posts={currentUser.postsliked} showStats={false} />
    </>
  );
};

export default LikedPosts;
