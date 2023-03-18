import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { imageToBase64 } from "./utils/utils";

function AddUser({ users, addUserData, handleEditUser, handleAddUser, setAddUserData }) {
    const { id } = useParams();

    const handleChange = async (e) => {
        if (e.target.type === "file") {
            let file = e.target.files[0];
            console.log(file);
            let maxMB = 2;
            const maxSize = maxMB * 1024 * 1024; // converting to bytes
            if (file.size > maxSize) {
                alert(`File size should not exceed ${maxMB} MB`);
                return;
            }

            let base64 = await imageToBase64(file);

            setAddUserData((prevState) => {
                return {
                    ...prevState,
                    image: base64,
                    profile: file,
                };
            });
        } else {
            setAddUserData((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                };
            });
        }
    };

    useEffect(() => {
        if (id) {
            let user = users.find((user) => user.id.toString() === id);
            if (user) {
                setAddUserData({ ...user, password: null });
            }
        }
    }, []);

    return (
        <form className="addUser-form" onSubmit={id ? handleEditUser : handleAddUser}>
            <fieldset>
                <legend>{id ? "Edit" : "Add"} User</legend>

                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue={addUserData.firstName}
                    onChange={handleChange}
                    placeholder="Enter Your First Name"
                />

                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue={addUserData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Your Last Name"
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={addUserData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                />

                <input
                    type="number"
                    name="age"
                    id="age"
                    defaultValue={addUserData.age}
                    onChange={handleChange}
                    placeholder="Enter Your Age"
                />

                <select
                    name="gender"
                    id="gender"
                    onChange={handleChange}
                    defaultValue={addUserData.gender}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <div>
                    {addUserData.image && (
                        <figure>
                            <img src={addUserData.image} alt={addUserData.firstName} />
                        </figure>
                    )}

                    <label htmlFor="user-image">Profile Image</label>
                    <input type="file" name="profile" id="profile" onChange={handleChange} />
                </div>
                <button className="btn">Add User</button>
            </fieldset>
        </form>
    );
}

export default AddUser;
