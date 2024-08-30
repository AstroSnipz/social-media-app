import Post from "./Post";

function Feed() {
  return (
    <div className="p-4 flex flex-col bg-white rounded-lg shadow-md gap-12">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;
