import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600 ml-8'>Suggested for you</h1>
                <span className='font-medium cursor-pointer relative left-0'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5 ml-8'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6] ml-8'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import axios from 'axios';
// import { setUserProfile } from '@/redux/authSlice'; // Action to update userProfile in Redux

// const SuggestedUsers = () => {
//     const dispatch = useDispatch();
//     const { suggestedUsers, userProfile, user } = useSelector(store => store.auth);
//     const [followingState, setFollowingState] = useState({}); // Track follow/unfollow state for each user

//     // Set initial follow state for suggested users
//     useEffect(() => {
//         const initialState = {};
//         suggestedUsers.forEach(user => {
//             initialState[user._id] = userProfile.following.includes(user._id); // Set true if already following
//         });
//         setFollowingState(initialState);
//     }, [ suggestedUsers , userProfile]);

//     // Handle follow/unfollow API call
//     const handleFollowUnfollow = async (suggestedUserId, isFollowing) => {
//         try {
//             const response = await axios.post(`http://localhost:3000/api/v1/user/followorunfollow/${suggestedUserId}`, {}, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: true, // Send cookies
//             });

//             const data = response.data;
//             if (data.success) {
//                 // Toggle follow/unfollow state
//                 setFollowingState(prevState => ({
//                     ...prevState,
//                     [suggestedUserId]: !isFollowing,
//                 }));

//                 // Update the userProfile in Redux
//                 dispatch(setUserProfile({
//                     ...userProfile,
//                     following: isFollowing
//                         ? userProfile.following.filter(id => id !== suggestedUserId) // Remove from following
//                         : [...userProfile.following, suggestedUserId], // Add to following
//                 }));
//             }
//         } catch (error) {
//             console.error('Failed to follow/unfollow:', error);
//         }
//     };

//     return (
//         <div className='my-10'>
//             <div className='flex items-center justify-between text-sm'>
//                 <h1 className='font-semibold text-gray-600 ml-8'>Suggested for you</h1>
//                 <span className='font-medium cursor-pointer relative left-0'>See All</span>
//             </div>
//             {
//                 suggestedUsers.map((user) => {
//                     const isFollowing = followingState[user._id];

//                     return (
//                         <div key={user._id} className='flex items-center justify-between my-5 ml-8'>
//                             <div className='flex items-center gap-2'>
//                                 <Link to={`/profile/${user._id}`}>
//                                     <Avatar>
//                                         <AvatarImage src={user.profilePicture} alt="user_image" />
//                                         <AvatarFallback>CN</AvatarFallback>
//                                     </Avatar>
//                                 </Link>
//                                 <div>
//                                     <h1 className='font-semibold text-sm'>
//                                         <Link to={`/profile/${user._id}`}>{user.username}</Link>
//                                     </h1>
//                                     <span className='text-gray-600 text-sm'>{user.bio || 'Bio here...'}</span>
//                                 </div>
//                             </div>
//                             <span
//                                 className={`text-xs font-bold cursor-pointer mx-4 ml-8 ${isFollowing ? 'text-gray-500 ' : 'text-[#3BADF8] hover:text-[#3495d6]'}`}
//                                 onClick={() => handleFollowUnfollow(user._id, isFollowing)}
//                             >
//                                 {isFollowing ? 'Unfollow' : 'Follow'}
//                             </span>
//                         </div>
//                     );
//                 })
//             }
//         </div>
//     );
// };

// export default SuggestedUsers;






