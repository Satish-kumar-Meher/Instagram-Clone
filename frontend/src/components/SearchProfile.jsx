// import { Dialog, DialogContent } from '@radix-ui/react-dialog'
// import React from 'react'
// import { DialogHeader } from './ui/dialog'

// function SearchProfile() {
//   return (
//    <Dialog opens={opens}>
//     <DialogContent onInteractOutside={() => setOpen(false)}>
//       <DialogHeader className="text-center font-semibold">Serach A Profile</DialogHeader>
//       <div>

//       </div>
//     </DialogContent>
//    </Dialog>
//   )
// }

// export default SearchProfile




// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
// import { Input } from './ui/input'; // Assuming you have an input component or you can use standard input
// import { Search } from 'lucide-react'; // Search icon
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Avatar for profile display
// import axios from 'axios';

// function SearchProfile({ open, setOpen }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchedProfiles, setSearchedProfiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const searchProfileHandler = async (e) => {

//     // if (searchQuery.trim() === '') return;

//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:3000/api/v1/user/suggested", { withCredentials: true });
//       if (res.data.success) {
//         setSearchedProfiles(res.data.users); // Assuming the response contains the list of users
//       } 
//       // console.log(res.data.users)
//       // console.log(searchedProfiles)
//       else {
//         setSearchedProfiles([]);
//       }
//     }
//      catch (error) {
//       console.error("Error fetching profiles:", error);
//       setSearchedProfiles([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     searchProfileHandler()
//   }, [])

//   const searchData = searchedProfiles.filter((curProfile) => curProfile.username.toLowerCase().includes(searchQuery.toLowerCase()))


//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent onInteractOutside={() => setOpen(false)}>
//         <DialogHeader className="text-center font-semibold">Search A Profile</DialogHeader>
        
//         <div  className="flex items-center gap-2 p-3 border-b">
//           <Input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by username"
//             className="flex-grow"
//           />
//           <button type="submit" className="p-2">
//             <Search className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>
        
//         {/* Display searched profiles */}
//         <div className="p-3">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             searchedProfiles.length > 0 ? (
//               searchData.map((profile) => (
//                 <div key={profile._id} className="flex items-center gap-3 my-2">
//                   <Avatar>
//                     <AvatarImage src={profile.profilePicture} alt={profile.username} />
//                     <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                   <p className="text-sm font-semibold">{profile.username}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No profiles found.</p>
//             )
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default SearchProfile;


// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
// import { Input } from './ui/input'; // Assuming you have an input component or you can use standard input
// import { Search } from 'lucide-react'; // Search icon
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Avatar for profile display
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function SearchProfile({ open, setOpen }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchedProfiles, setSearchedProfiles] = useState([]);
//   // const [loading, setLoading] = useState(false);

//   const searchProfileHandler = async () => {
//     if (searchQuery.trim() === '') return; // No need to fetch if query is empty

//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:3000/api/v1/user/suggested", { withCredentials: true });
//       if (res.data.success) {
//         setSearchedProfiles(res.data.users); // Assuming the response contains the list of users
//       } else {
//         setSearchedProfiles([]);
//       }
//     } catch (error) {
//       console.error("Error fetching profiles:", error);
//       setSearchedProfiles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // We are not fetching profiles initially. The search will be triggered when the user starts typing.
//   }, []);

//   // Filter profiles based on the search query
//   const searchData = searchedProfiles.filter((curProfile) => 
//     curProfile.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Trigger search when searchQuery changes and is not empty
//   useEffect(() => {
//     if (searchQuery.trim()) {
//       searchProfileHandler();
//     } else {
//       setSearchedProfiles([]); // Clear profiles if the input is cleared
//     }
//   }, [searchQuery]);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent onInteractOutside={() => setOpen(false)}>
//         <DialogHeader className="text-center font-semibold">Search A Profile</DialogHeader>
        
//         <div className="flex items-center gap-2 p-3 border-b">
//           <Input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by username"
//             className="flex-grow"
//           />
//           <button type="submit" className="p-2">
//             <Search className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>
        
//         {/* Display searched profiles only after search query is entered */}
//         <div className="p-3">
//           {/* {loading ? (
//             <p>Loading...</p>
//           ) : ( */}
//             {searchQuery.trim() && searchData.length > 0 ? (
//               searchData.map((profile) => (
//                 <div key={profile._id} className="flex items-center gap-3 my-2">
//                   <Link to={`/profile/${profile._id}`}>
//                   <Avatar>
//                     <AvatarImage src={profile.profilePicture} alt={profile.username} />
//                     <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                   </Link>
//                   <p className="text-sm font-semibold">{profile.username}</p>
//                 </div>
//               )
//               )
//             ) : searchQuery.trim() && searchData.length === 0 ? (
//               <p>No profiles found.</p>
//             ) : null }  
//           {/* // )} */}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default SearchProfile;



import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Input } from './ui/input'; // Assuming you have an input component or you can use standard input
import { Search } from 'lucide-react'; // Search icon
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Avatar for profile display
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchProfile({ open, setOpen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProfiles, setSearchedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset search input and results when the dialog is closed or opened
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSearchedProfiles([]);
    }
  }, [open]);

  const searchProfileHandler = async () => {
    if (searchQuery.trim() === '') return; // No need to fetch if query is empty

    setLoading(true);
    try {
      const res = await axios.get("https://instagram-clone-a4wz.onrender.com/api/v1/user/suggested", { withCredentials: true });
      if (res.data.success) {
        setSearchedProfiles(res.data.users); // Assuming the response contains the list of users
      } else {
        setSearchedProfiles([]);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setSearchedProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter profiles based on the search query
  const searchData = searchedProfiles.filter((curProfile) => 
    curProfile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger search when searchQuery changes and is not empty
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProfileHandler();
    } else {
      setSearchedProfiles([]); // Clear profiles if the input is cleared
    }
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">Search A Profile</DialogHeader>
        
        <div className="flex items-center gap-2 p-3 border-b">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username"
            className="flex-grow"
          />
          <button type="submit" className="p-2">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Display searched profiles only after search query is entered */}
        <div className="p-3">
          {/* {loading ? (
            <p>Loading...</p>
          ) : ( */}
          
            {searchQuery.trim() && searchData.length > 0 ? (
              searchData.map((profile) => (
                <div key={profile._id} className="flex items-center gap-3 my-2">
                  <Link to={`/profile/${profile._id}`} onClick={() => setOpen(false)}>
                    <Avatar>
                      <AvatarImage src={profile.profilePicture} alt={profile.username} />
                      <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <p className="text-sm font-semibold">{profile.username}</p>
                </div>
              ))
            ) : searchQuery.trim() && searchData.length === 0 ? (
              <p>No profiles found.</p>
              ) : null}
          {/* // )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchProfile;
