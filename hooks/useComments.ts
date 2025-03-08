import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Comment } from "@/types/restaurant";

export const useComments = (
  initialComments: Comment[],
  restaurantId: number
) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const t = useTranslations("RestaurantDetails");

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch("/api/comment-restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId,
          content: newComment,
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prevComments) => [...prevComments, newCommentData]);
        setNewComment("");
        toast.success(t("toastCommentSuccess"));
      } else {
        toast.error(t("toastCommentError"));
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(t("toastCommentError"));
    }
  };

  return {
    comments,
    newComment,
    setNewComment,
    handleCommentSubmit,
  };
};
