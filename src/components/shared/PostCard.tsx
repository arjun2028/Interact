import { Models } from "appwrite";
import { Link } from "react-router-dom";

//import { PostStats } from "@/components/shared";
//import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostActivity from "./PostActivity";

type PostCardProps = {
  post: Models.Document;
};

export const PostCard = ({ post }: PostCardProps) => {
  function timeAgo(timestamp: string) {
    const currentDate: Date = new Date(); // Explicitly declare the type of currentDate
    const pastDate: Date = new Date(timestamp); // Explicitly declare the type of pastDate
    const timeDifference: number = currentDate.getTime() - pastDate.getTime(); // Explicitly declare the type of timeDifference
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 7) {
      return pastDate.toLocaleDateString(); // Show full date if more than a week old
    } else if (days > 1) {
      return `${days} days ago`;
    } else if (days === 1) {
      return "1 day ago";
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (hours === 1) {
      return "1 hour ago";
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else if (minutes === 1) {
      return "1 minute ago";
    } else {
      return "Just now";
    }
  }
  const { user } = useUserContext();

  if (!post.creator) return;

  console.log(post);

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {timeAgo(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.ImageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <PostActivity post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
