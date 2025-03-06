import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Comment } from "@/types/restaurant";
import { useSession } from "next-auth/react";

interface CommentComponentProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleCommentSubmit: () => void;
  t: (key: string) => string;
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  t,
}) => {
  const { data: session } = useSession();
  return (
    <div className="mt-8">
      {session && (
        <Card className="mt-4">
          <CardHeader>
            <h3 className="text-lg font-semibold">{t("addComment")}</h3>
          </CardHeader>
          <CardContent>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t("addCommentPlaceholder")}
              className="w-full p-2 border rounded-lg"
            />
            <Button
              onClick={handleCommentSubmit}
              className="mt-2"
              disabled={!newComment.trim()}
            >
              {t("submitComment")}
            </Button>
          </CardContent>
        </Card>
      )}
      <h2 className="text-xl font-semibold mb-4 mt-10">{t("comments")}</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{comment.user?.name}</span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), "dd.MM.yyyy HH:mm")}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-secondaryText">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
