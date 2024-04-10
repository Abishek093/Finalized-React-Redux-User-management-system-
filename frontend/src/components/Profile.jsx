
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProfileUpdate } from '../features/auth/authSlice';


function Profile() {
  const {user} = useSelector((state)=> state.auth);
  const [image , setImage] = useState("");
  const dispatch = useDispatch();


  const uploadImage =(e)=>{
    e.preventDefault()
    
    if (!image) {
      toast.error("please upload a file")

      return 
    }

    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset", "elellcsz");
    data.append("cloud_name", "dzkpcjjr8");

    fetch("https://api.cloudinary.com/v1_1/dzkpcjjr8/image/upload",{
      method :"post",
      body: data,
    })
    .then((response)=> response.json())
    .then((data)=>{
      dispatch(ProfileUpdate(data.url))
    })
    .catch((err) => console.log(err));

  }
  return (
    <div className="container">
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            {
              <Link to={'/'}></Link>
            }
            <li className="breadcrumb-item"> <Link to='/'>Home</Link></li>
          
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
        
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src={
              user?.profileURL
              ? user.profileURL
              : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"  className="rounded-circle" width="150"
            />
                
                  <div className="mt-3">
                    <h4>{user.name}</h4>

                    {/* <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                    {/* <button className="btn btn-primary">Follow</button> */}

                    <div className="upload-button">
              <div class="custom-file-upload">
                <label for="profile" class="custom-button">
                  Choose File
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="profile"
                  id="profile"
                  class="hidden-input"
                />
              </div>

              <button className="btn" onClick={uploadImage}>
                Upload!
              </button>
            </div>
                    
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.email}
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
