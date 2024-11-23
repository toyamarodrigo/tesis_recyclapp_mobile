import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Comment, CommentCreate } from "@models/comment.type";
import { commentApi } from "@api/api.comment";
import { commentKeys } from "@api/query/comment.factory";

const useCommentList = () => {
  return useQuery({ ...commentKeys.comment.list() });
};

const useCommentListByPostId = ({ postId }: { postId: string }) => {
  return useQuery({
    ...commentKeys.comment.listByPostId(postId),
    enabled: !!postId,
  });
};

const useCommentById = ({ id }: { id: string }) => {
  return useQuery({
    ...commentKeys.comment.detail(id),
    enabled: !!id,
  });
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: (comment: CommentCreate) => commentApi.createComment(comment),
    onSuccess: (comment: Comment) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.comment.listByPostId(comment.postId).queryKey,
      });
    },
  });
};

export {
  useCommentList,
  useCommentListByPostId,
  useCommentById,
  useCreateComment,
};
