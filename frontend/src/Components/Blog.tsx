import axios from "axios"
import { Blogtypes } from "../hooks"
import { Avatar } from "./BlogCard"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import {useNavigate } from 'react-router-dom'

export const Blog=({blog}:{blog:Blogtypes})=>{
    return (
        <div>
            <div>
            <Showblog blog={blog}/>
            </div>
        </div>
    )
}
const Button=({id,title,content}:{id:string,title:string,content:string})=>{
       const navigate= useNavigate();
    const handleSubmit = async () => {

        axios.put(`${BACKEND_URL}/api/v1/blog/${id}`,{
            title,content
        },
         {headers:{ Authorization: localStorage.getItem("jwt")} })
            .then(() => {
                navigate(`/blogs`);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
      };
    return (
    <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Update</button>
    )
}
const Showblog = ({ blog }: { blog: Blogtypes }) => {
    const userid= localStorage.getItem("userId");
    // console.log(userid);
    //@ts-ignore
    const isAuthor= userid === blog.author.id;
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [isModified, setIsModified] = useState(false);
  
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setIsModified(true);
    };
    
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsModified(true);
    };
  
    return (
      <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-10 w-full pt-20 max-w-screen-2xl">
          {/* Reorder author block for small screens (below 1024px) */}
          <div className="col-span-1 lg:col-span-4 order-1 lg:order-2">
            <span className="mx-8 font-thin">Author</span>
            <div className="flex">
              <Avatar name={blog.author.name || 'Anonymous'} />
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name ? blog.author.name : 'Anonymous'}
                  <br />
                </div>
              </div>
            </div>
          </div>

          {/* Title and content block */}
          <div className="col-span-1 lg:col-span-8 order-2 lg:order-1">
            <div className="text-5xl font-extrabold">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={`bg-transparent border-b border-black outline-none ${!isAuthor ? 'pointer-events-none' : ''}`}
              />
              {isModified && isAuthor && <Button id={blog.id} title={title} content={content} />}
            </div>
            <div className="pt-4">
              <textarea
                value={content}
                onChange={handleContentChange}
                className={`w-full h-screen bg-transparent outline-none ${!isAuthor ? 'pointer-events-none' : ''}`}
                placeholder="Start Typing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
