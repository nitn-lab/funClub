import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { FaTimes } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VideoComponent from './VideoComponent';
import tick from '../Global/icons/tick.png';
import crown from '../Global/icons/crown.png';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CommentsModal = ({ open, onClose, post }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [expandedReplies, setExpandedReplies] = useState({});
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const toggleReplies = (commentId) => {
        setExpandedReplies(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/posts/${post._id}/comments`, { commentText }, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setComments([...comments, response.data.comment]);
            setCommentText('');
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/posts/${post._id}/comments/${commentId}/replies`, { replyText }, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const updatedComments = comments.map(comment =>
                comment._id === commentId
                    ? { ...comment, replies: [...comment.replies, response.data.reply] }
                    : comment
            );
            setComments(updatedComments);
            setReplyText('');
            setReplyToCommentId(null);
        } catch (error) {
            console.error("Error adding reply", error);
        }
    };
console.log(post, 'post')
    return (
        <Modal open={open} onClose={onClose} center
            closeIcon={<FaTimes className="text-xl p-1 float-end text-white" />}
            classNames={{
                overlay: { background: "rgba(0, 0, 0, 0.462)" },
                modal: "customCommentModal",
            }}>
            <div className='w-full'>
                <div className="flex w-full">
                    <div className='w-1/2'>
                        {post.image && <img
                            src={post.image}
                            className={`w-full h-full object-contain rounded-md `}
                            alt="Post Content"
                        />}
                        {post.video && <VideoComponent
                            src={post.video}
                            className={`w-full h-full mx-auto rounded-md `}
                            poster={'https://gratisography.com/photo/reindeer-dog/'}
                            alt="Post Content"
                        />}
                    </div>
                    <div className='p-3 border-l-2 border-[#363636] w-1/2 h-full overflow-y-auto'>

                        <div className='comment-container mt-3 scrollable-div'>
                            {post.comments && post.comments.length > 0 ? post.comments.map(comment => (
                                <div key={comment._id} className=" py-4">
                                    <div>
                                        <div className="flex gap-x-3 items-start">
                                            <div className="flex items-start gap-1" onClick={() => navigate(`/dashboard/user/${comment.createdBy._id}`)}>
                                                <h2>{comment.createdBy.username}</h2>
                                                {comment.createdBy.role === 'creator' && <img src={tick} className="h-4" />}
                                                {comment.createdBy.role === 'vip creator' && <img src={crown} className="h-4" />}
                                            </div>
                                            <p className='break-words text-sm overflow-auto mt-1'>{comment.commentText}</p>
                                        </div>
                                        <button className='ml-10' onClick={() => setReplyToCommentId(comment._id)}>Reply</button>
                                    </div>

                                    {replyToCommentId === comment._id && (
                                        <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="my-4 flex items-center bg-black  px-4 py-2 rounded-sm">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Add a reply..."
                                                className="w-full rounded border border-none outline-none bg-black"
                                            />
                                            <button type="submit">Reply</button>
                                        </form>
                                    )}

                                    <div>
                                        {comment.replies && comment.replies.length > 0 && (
                                            <button className="mt-2 text-sm text-gray-500" onClick={() => toggleReplies(comment._id)}>
                                                {expandedReplies[comment._id] ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
                                            </button>
                                        )}
                                    </div>

                                    {expandedReplies[comment._id] && (
                                        <div className="ml-5 mt-2">
                                            {comment.replies.map(reply => (
                                                <div key={reply._id} className="mt-2">
                                                    <div className="flex gap-x-3 items-start">
                                                        <div className="flex gap-x-3 items-center cursor-pointer" onClick={() => navigate(`/dashboard/user/${reply.createdBy._id}`)}>
                                                            <div className="flex items-start gap-1">
                                                                <h2>{reply.createdBy.username}</h2>
                                                                {reply.createdBy.role === 'creator' && <img src={tick} className="h-4" />}
                                                                {reply.createdBy.role === 'vip creator' && <img src={crown} className="h-4" />}
                                                            </div>
                                                        </div>
                                                        <p className='break-words text-sm overflow-auto mt-1'>{reply.replyText}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )) : <div className='max-h-96 h-96 flex items-center justify-center'>No comments yet!!</div>}
                        </div>

                        <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center bg-black py-2 px-4">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full  rounded border-none outline-none bg-black"
                            />
                            <button type="submit" className="">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CommentsModal;