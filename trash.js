// adminDashboard upto image style and bootstrap


// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// // import { getAllusers, reset ,blockUser , editUser } from '../../features/adminAuth/adminAuthSlice';
// import { getAllusers, reset} from '../../features/admin/adminSlice';
// import { FaSearch } from 'react-icons/fa';




// function UserList() {

//   const dispatch = useDispatch()
//   const users = useSelector((state) => state.adminAuth.users)
// //   const isLoading = useSelector((state) => state.adminAuth.isLoading)


//   const [searchQuery , setSearch ] = useState('')
//   const [filterdUsers , setFilterdUsers] = useState([])

//   useEffect(() => {
//     dispatch(getAllusers())

//     return () => {
//       dispatch(reset())
//     }

//   }, [dispatch])


//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilterdUsers(users);
//     //   console.log("hjhgf",users);
//     } else {
//       const filtered = users.filter((user) =>
//         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilterdUsers(filtered);
//     }
//   }, [searchQuery, users]);
  

// //   const handleBlock = (userId) => {
//     // if (window.confirm("Are you sure want to block the user?")) {
//     //   dispatch(blockUser(userId))
//     // }
// //   }

// //   const handleEdit = (userId , name , email) => {
//     //   const newName =  prompt("Enter your New Name :",name);
//     //   const newEmail = prompt("Enter your new Email :",email)

//     //   if (newName === null || newEmail === null) {
//     //     return;
//     //   }
//     //   if (newName && newEmail) {
//     //      dispatch(editUser({userId , name:newName ,email:newEmail }))
//     //   }
// //   }

//   return (
//     <div className="user-list">
//       <div style={{display:'flex'}}  className='form-group'>
//             <input style={{height:'35px'}} className='form-control' placeholder='username/email'  type='text'
//       value={searchQuery}
//       onChange={(e)=> setSearch(e.target.value)}/>
//             <button style={{height:'35px',marginLeft:'10px'}} className='btn-1'> <FaSearch/> Search</button>
//         </div>
      
//   {filterdUsers && filterdUsers.length > 0 ? (
//     <table>
//       <thead>
//         <tr>
//           <th>Sl No</th>
//           <th>Photo</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filterdUsers.map((user, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>
//               <img
//                 src={
//                   user?.profileURL
//                     ? user.profileURL
//                     : "https://avatar.iran.liara.run/public/boy?username=Ash"
//                 }
//                 alt="User 2"
//               />
//             </td>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.isBlocked ? "Blocked" : "Unblocked"}</td> 
//             <td className="action-buttons">
//             <div className="table-button">
//             {/* <button onClick={() => handleBlock(user._id)}  className="btn">{user.isBlocked ? "Unblock" : "Block"}</button>
//             <button onClick={() => handleEdit (user._id , user.name , user.email) }  className="btn">Edit</button> */}
//             </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//    ) : ( 
//      <p>No users available</p> 
//   )} 
//  {/* {isLoading && <p>Loading...</p>}  */}
// </div>

 
//   )
// }

// export default UserList


// ________________________________________________________________________________________________________________________________


//profile page before image upload

// import { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { updateProfile } from "../features/auth/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import { reset } from "../features/auth/authSlice";

// function UserProfile() {
//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );
//   const [formData, setFormData] = useState({
//     name: user ? user.name : "",
//     email: user ? user.email : "",
//     image:user ? user.image : ""
//   });

//   const { name, email } = formData;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     // if (isLoading) {
//     //     return <Spinner />;
//     // }
//     if (isSuccess) {
//       navigate("/");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // const onSubmit = (e) => {
//   //   e.preventDefault();

//   //   const validationErrors = validateForm();
//   //   if (Object.keys(validationErrors).length > 0) {
//   //     for (const key in validationErrors) {
//   //       toast.error(validationErrors[key]);
//   //     }
//   //     return;
//   //   }
//   //   console.log("vghsdfgvjshdgfhjksdgf", formData);
//   //   dispatch(updateProfile(formData));
//   // };


//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       for (const key in validationErrors) {
//         toast.error(validationErrors[key]);
//       }
//       return;
//     }

//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "elellcsz");
//     data.append("cloud_name", "dzkpcjjr8");

//     try {
//       const cloudinaryResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/dzkpcjjr8/image/upload",
//         {
//           method: "POST",
//           body: data,
//         }
//       );

//       const cloudinaryData = await cloudinaryResponse.json();
//       const imageUrl = cloudinaryData.url;
//       console.log("hjgjghftfg",{ ...formData, image: imageUrl });

//       dispatch(updateProfile({ ...formData, image: imageUrl }));
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       toast.error("Error uploading image");
//     }
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!name.trim()) {
//       errors.name = "Name is required";
//     }

//     if (!email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Email is invalid";
//     }

//     return errors;
//   };

//   return (
//     <>

//       <section className="heading">
//         <h1>
//           <FaUser /> Profile
//         </h1>
//       </section>
      

//       <section className="form">
//         <form onSubmit={onSubmit}>

//         <div className="form-group">
//             <input
//               type="file"
//               className="form-control"
//               id="image"
//               name="image"
//               // value={name}
//               onChange={onChange}
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={name}
//               placeholder="Enter name"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter email"
//               onChange={onChange}
//             />
//           </div>

//           <div className="form-group">
//             <button type="submit" className="btn btn-block">
//               Update
//             </button>
//           </div>
//         </form>
        
//       </section>
//     </>
//   );
// }

// export default UserProfile;