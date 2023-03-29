import React, { useEffect } from "react";
import { PostItem } from "../componets/PostItem";
import { PopularPosts } from "../componets/PopularPosts"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/post/postSlice";


export const MainPage = () => {
  
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  // console.log(popularPosts)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постів не існує
      </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10">
          { posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">
            Популярні:
          </div>

          {
              popularPosts?.map((post, idx) => (
                <PopularPosts key={idx} post={post} />
              ))
          }
        </div>
      </div>
    </div>
  ); 
};
