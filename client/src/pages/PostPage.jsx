import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from "../utils/axios";
import { removePost } from "../redux/features/post/postSlice";

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      navigate("/posts");
      toast('Пост було видалено')
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Завантаження...
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="object-cover h-full"
                />
              )}
            </div>
            
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2  text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
