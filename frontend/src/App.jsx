import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Users from "./Users";
import AddUser from "./AddUser";
import { idGenerator } from "./utils/utils";
import UsersData from "./assets/data/users.json";
import axiosInstance from "./axiosInstance";

function App() {
    const [users, setUsers] = useState(UsersData.users);

    const [addUserData, setAddUserData] = useState({
        firstName: "",
        lastName: "",
        age: null,
        gender: "",
        email: "",
        username: "",
        image: "",
    });

    const handleAddUser = async (e) => {
        e.preventDefault();

        let id = idGenerator();
        let password = idGenerator(10, true);

        let userData = { ...addUserData, id, password };

        const formData = new FormData();

        for (const key in userData) {
            if (key !== "image") {
                formData.append(key, userData[key]);
            }
        }

        console.log("ADD USER DATA: ", userData);
        try {
            const res = await axiosInstance({
                method: "post",
                url: "users",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data;",
                },
            });

            console.log("RES: ", res);

            if (res.data.status == "Success") {
            }
        } catch (err) {
            console.log("ERR: ", err);
        }
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        console.log("Edit USER DATA: ", addUserData);
    };

    return (
        <section className="app">
            <Header />

            <section className="main-container">
                <Routes>
                    <Route path="/users" element={<Users users={users} />} />
                    <Route
                        path="/addUser"
                        element={
                            <AddUser
                                addUserData={addUserData}
                                setAddUserData={setAddUserData}
                                handleAddUser={handleAddUser}
                            />
                        }
                    />
                    <Route
                        path="/editUser/:id"
                        element={
                            <AddUser
                                users={users}
                                addUserData={addUserData}
                                setAddUserData={setAddUserData}
                                handleAddUser={handleAddUser}
                                handleEditUser={handleEditUser}
                            />
                        }
                    />
                </Routes>
            </section>
        </section>
    );
}

export default App;
