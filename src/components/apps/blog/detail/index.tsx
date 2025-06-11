
import  { useEffect, useContext, useState } from "react";

import { FaQuoteLeft } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { uniqueId } from "lodash";
import {
  Avatar,
  Badge,
  Button,
  HR,
  List,
  Textarea,
  Tooltip,
  Dropdown
} from "flowbite-react";
import BlogComment from "./BlogCommnets";
import { useLocation, useParams } from "react-router";
// import { BlogContext, BlogContextProps } from "src/context/BlogContext";
import CardBox from "src/components/shared/CardBox";
import { BlogType } from "src/types/apps/blog";
import React from "react";
import { getTicketComments, getTicketDetails, postTicketComments, editTicket } from "src/utils/api";
import { error } from "console";

const BlogDetailData = () => {
  //const { posts, setLoading, addComment }: BlogContextProps = useContext(BlogContext);
  // const location = useLocation();
  // const pathName = location.pathname;
  // const getTitle: string | any = pathName.split('/').pop();
  //const post = posts.find((p) => p.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === getTitle);
  const [replyTxt, setReplyTxt] = React.useState("");
  const {id}=useParams();
  const [ticketData,setTicketData]=useState<any>({});
  const [comments,setComments]=useState<any>({});

 
  // const onSubmit = () => {
  //   if (!post || !post.id) return;
  //   const newComment = {
  //     id: uniqueId('#comm_'),
  //     profile: {
  //       id: uniqueId('#USER_'),
  //       avatar: post.author?.avatar || '',
  //       name: post.author?.name || '',
  //       time: 'Now',
  //     },
  //     comment: replyTxt,
  //     replies: [],
  //     postId: post.id,
  //   };
  //   addComment(post.id, newComment);
  //   setReplyTxt('');
  // };

  // skeleton
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 700);

  //   return () => clearTimeout(timer);
  // }, []);

  const handleStatusChange:any =(status:string,id:string,ticket:any)=>{
      const payload={
        "area": ticket.area,
        "priority": ticket.priority,
        "status": status,
        "description": ticket.description,
        "title":ticket.title
      }
      editTicket(
        (data:any)=>{
          console.log("succes in change",data);
          getTicketDetails(
            (data:any)=>{
              console.log(data)
              setTicketData(data);
            },
            (error:any)=>{console.log(error)},
            id
          )
        },
        (data:any)=>{console.log(data)},
        id,
        payload
      )
    }

  type colorsType={
    [key:string]:string
  }

  const colours:colorsType={
    "open":"lightsuccess",
    "closed":"lighterror"
  }
  useEffect(()=>{
    
    //let id="9f16fe5f-28c7-4305-a36e-2e16081bc06e"
    getTicketDetails(
      (data:any)=>{
        console.log(data)
        setTicketData(data);
      },
      (error:any)=>{console.log(error)},
      id
    )

    getTicketComments(
      (data:any)=>{
        setComments(data);
        console.log(data);
      },
      (error:any)=>{console.log(error)},
      id
    )
  },[])

  // const onSubmit=(comment:any)=>{
  //   postTicketComments(
  //     (data:any)=>{
  //       console.log("commented successfully")
  //       setReplyTxt("")
  //       getTicketComments(
  //         (data:any)=>{
  //           console.log(data);
  //         },
  //         (error:any)=>{console.log(error)},
  //         id
  //       )
  //     },
  //     (error:any)=>{
  //       console.log(error);
  //     },
  //     id,
  //     comment
  //   )
  // }
  const onSubmit = (comment:any) => {
    postTicketComments(
      (data:any) => {
        console.log("Comment posted successfully:", data);
        setReplyTxt("");
  
        // Refresh comments
        getTicketComments(
          (data:any) => {
            console.log("Fetched updated comments:", data);
            setComments(data); // Update comments state
          },
          (error:any) => {
            console.error("Error fetching comments:", error);
          },
          id
        );
      },
      (error:any) => {
        console.error("Error posting comment:", error);
      },
      id,
      comment
    );
  };
  
  return (
    <>
        <>
          <CardBox className="p-0 overflow-hidden">
            <div className="relative ">
              {/* <div className="overflow-hidden max-h-[440px]">
                <img
                  src={post?.coverImg}
                  alt="MatDash"
                  height={440}
                  width={1500}
                  className="w-100 object-cover object-center "
                />
              </div> */}
              {/* <Badge color={"white"} className="absolute bottom-8 end-6">
                2 min Read
              </Badge> */}
            </div>
            {/* <div className="flex justify-between items-center -mt-7 px-6">
              <div>
                <Tooltip content={post ? post?.author.name : ""} className="">
                  <Avatar img={post?.author.avatar} rounded />
                </Tooltip>
              </div>
            </div> */}
            <div className="px-6 pb-6">
              {/* <Badge color={"muted"} className="mt-3">
                {post?.category}
              </Badge> */}
              {/* <h2 className="md:text-4xl text-2xl my-6">{post?.title}</h2> */}
              {/* <div>
                <div className="flex gap-3">
                  <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
                    <Icon icon="solar:eye-outline" height="18" className="text-ld" />
                    {post?.view}
                  </div>
                  <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
                    <Icon icon="solar:chat-line-outline"
                    height="18"
                      className="text-ld"
                    />{" "}
                    {post?.comments?.length || 0}
                  </div>
                  <div className="ms-auto flex gap-2 items-center  text-darklink dark:text-bodytext text-[15px]">
                    <GoDot 
                      size="16"
                      className="text-ld"
                    />
                    <small>
                      {post && post.createdAt ? format(new Date(post.createdAt), 'E, MMM d') : ''}
                    </small>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <HR className="my-0 mb-4" /> */}
            <div className="px-6 pb-6">
              <h2 className="md:text-3xl text-2xl ">{ticketData.title}</h2>
              <div className="flex justify-between text-lg font-medium pb-5">
                <span>
                  <b className="text-ld">Area:</b>
                  <i>{ticketData.area}</i>
                </span>
                <span>
                <b className="text-ld">Priority:</b>
                  <i>{ticketData.priority}</i>
                </span>
              </div>
              <p className="text-darklink dark:text-bodytext">
                {ticketData.description}
              </p>
              
              <br></br>
              <p>
                <b className="text-ld">
                  Created By:-
                </b>
              </p>
              <i>{ticketData.createdBy?.firstName} {ticketData.createdBy?.lastName}</i>
              <HR />
              {/* <h3 className="text-xl mb-3">Unorder list.</h3>
              <List>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
              </List>
              <HR />
              <h3 className="text-xl mb-3">Order list.</h3>
              <List ordered>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
              </List> */}
              {/* <HR /> */}
              {/* <h3 className="text-xl mb-3">Quotes</h3> */}
              {/* <div className={`pt-5 pb-4 px-4 rounded-md border-primary flex justify-center items-center gap-1 bg-${colours[ticketData.status]}`}> */}
                {/* <FaQuoteLeft 
                  size={20}
                  className="text-ld -mt-1"
                /> */}
                {/* <div>
                  <div className="">

                  </div>
                  <div className=""></div>
                </div> */}
                {/* <h2 className={`text-base font-bold items-center m-auto `}>
                  {ticketData.status}
                </h2> */}
                <Dropdown
                  label={ticketData.status=="open"?"Open":"Closed"}
                  size="md"
                  placement="bottom-end"
                  color={ticketData.status=='open'?"lightsuccess":"lighterror"}
                  theme={{ floating: { target: "w-32" } }}
                    // onSelect={(newStatus: string) => handleStatusChange(ticket.id, newStatus)}
                  >
                  <Dropdown.Item onClick={()=>handleStatusChange("open",ticketData.id,ticketData)}>
                    Open
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleStatusChange("closed",ticketData.id,ticketData)} >
                    Closed
                  </Dropdown.Item>
                                    
                </Dropdown>
              {/* </div> */}
            </div>
          </CardBox>
          <CardBox className="mt-6">
            <h5 className="text-xl mb-2">Post Comments</h5>
            <Textarea
              rows={4}
              value={replyTxt}
              className="form-control-textarea"
              onChange={(e) => setReplyTxt(e.target.value)}
            ></Textarea>
            <Button color={"primary"} className="w-fit mt-3" onClick={()=>onSubmit(replyTxt)}>
              Post Comment
            </Button>
            <div className="mt-6">
              <div className="flex gap-3 items-center">
                <h5 className="text-xl ">Comments</h5>
                <div className="h-8 w-8 rounded-full bg-lightprimary dark:bg-lightprimary flex items-center justify-center text-primary font-bold">
                  {comments.total}
                </div>
              </div>
              {comments.total>0?(<div className="custom-scrollbar h-96">
                {comments?.data?.map((element:any) => {
                  return (
                    <BlogComment key={element.id} comment={element} />
                  );
                })}
              </div>):(
                <p className="text-xl text-center py-6 font-bold">No Comments </p>
              )}
              
            </div>
          </CardBox>
        </>
      {/* ) : (
        <p className="text-xl text-center py-6 font-bold">No Post Found</p>
      )} */}
    </>
  );
};
export default BlogDetailData;
