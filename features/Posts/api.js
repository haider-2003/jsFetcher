import { BASEURL } from "../../config";
import { apiFactory } from "../../utils/apiFactory";

const Posts = apiFactory({
  endpoint: `${BASEURL}/posts`,
  entityName: "posts",
});

export const useGetPosts = Posts.useGetList;
export const useGetPost = Posts.useGetById;
export const useCreatePost = Posts.useCreate;
export const useUpdatePost = Posts.useUpdate;
export const useDeletePost = Posts.useDelete;