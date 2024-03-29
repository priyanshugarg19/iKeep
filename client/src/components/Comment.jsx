import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setEditing(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/commentedit/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editedComment
        })
      });
      const data = await res.json();

      if (res.ok) {
        onEdit(comment, editedComment);
        setEditing(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="2-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600"
          src={user.photoUrl}
          alt="user"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {editing ? (
          <>
            <textarea
              onChange={(e) => setEditedComment(e.target.value)}
              maxlength="200"
              className="no-scrollbar bg-transparent mt-2 dark:focus:ring-slate-600 focus:ring-gray-200 border-2 border-gray-200 dark:border-gray-600 shadow-2xl outline-none w-full placeholder:dark:text-white/70 placeholder:text-gray-600 rounded-lg transition-all resize-none"
              type="text"
              value={editedComment}
              placeholder="Write a comment.."
              name="comment"
            ></textarea>
            <div className=" flex justify-end gap-2 m-2">
              <button
                onClick={handleSave}
                type="button"
                class="relative inline-flex items-center justify-center p-4 px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span class="relative text-white">Save</span>
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                }}
                type="submit"
                class="relative inline-flex items-center justify-center p-4 px-5 py-1.5  overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 border-2 border-purple-500 hover:ring-purple-500"
              >
                <span class="relative text-purple-500">Cancel</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-800 dark:text-gray-200 pb-2">
              {comment.content}
            </p>

            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-600 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => {
                  onLike(comment._id);
                }}
                className={` text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  !comment.likes.includes(currentUser._id) &&
                  "!text-gray-400"
                } ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  " !text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser && currentUser._id === comment.userId && (
                <button
                  onClick={handleEdit}
                  className=" text-gray-400 hover:text-blue-500">
                  Edit
                </button>
              )}
              {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) &&  (
                <button
                  onClick={()=>{onDelete(comment._id)}}
                  className=" text-gray-400 hover:text-red-500 mr-2">
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
