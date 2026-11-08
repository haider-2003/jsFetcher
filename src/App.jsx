import { useState } from "react";
// import {  GetById } from "../utils/apiFactory";
import {
  useCreatePost,
  useDeletePost,
  useGetPosts,
  useUpdatePost
} from "../features/Posts/api";
import Provider from "../Providers/Provider";
import { serializeQuery } from "../utils/serializeQuery";

function App() {
  return (
    <Provider>
      <Example />
    </Provider>
  );
}

function Example() {
  const [id, setId] = useState(1);
  const [userId, setUserId] = useState(1);
  const { mutate } = useCreatePost();
  const { mutate: update } = useUpdatePost();
  const { mutate: deleteFn } = useDeletePost();

  const query = {
    page: 1,
    pageSize: 10,
    filter: [{ field: "userId", value: 1 }],
  };
  let serializedData = serializeQuery(query);

  const { data: posts } = useGetPosts(serializedData);
  // const { data: post } = useGetPost(id);
  // console.log(posts);
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let data = { userId: 1 };
    const formData = new FormData(form);
    for (const input of formData) {
      data[input[0]] = input[1];
    }
    mutate(data);
  }

  function handleUpdate() {
    const data = {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    };
    update({ data, id: data.userId });
  }
  function handleDelete() {
    deleteFn(id);
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3 px-4"
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className=" w-full rounded-lg py-2 border border-gray-300 shadow-sm px-3 outline-none transition focus:border-gray-500 text-gray-900 focus:ring-2 focus:ring-gray-200"
        />
        <textarea
          name="body"
          id="body"
          placeholder="Description"
          rows={5}
          className="w-full  rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
        ></textarea>
        <div>
          <button className="flex-start text-white bg-sky-500 rounded-lg px-2.5 py-1.5 font-semibold">
            Submit
          </button>
        </div>
      </form>

      <button
        className=" bg-blue-500 text-white rounded-lg px-2 py-1.5"
        onClick={handleUpdate}
      >
        Fire Update
      </button>
      <button
        className=" bg-blue-500 text-white rounded-lg px-2 py-1.5 mt-3"
        onClick={handleDelete}
      >
        Delete function
      </button>
    </div>
  );
}

export default App;
