import React from "react";
import { Link } from "react-router-dom";

function Users({ users }) {
    return (
        <>
            <h1>Users</h1>
            <section className="users-container">
                {users.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </section>
        </>
    );
}

function User({ user }) {
    return (
        <article className="user">
            <figure>
                <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            </figure>

            <h2>
                Username: <span> {user.username}</span>
            </h2>
            <h2>
                First Name: <span> {user.firstName}</span>
            </h2>
            <h2>
                Last Name: <span> {user.lastName}</span>
            </h2>
            <h2>
                Email: <span> {user.email}</span>
            </h2>
            <h2>
                Age: <span> {user.age}</span>
            </h2>
            <h2>
                Gender: <span> {user.gender}</span>
            </h2>

            <Link className="btn" to={`/editUser/${user.id}`}>
                Edit
            </Link>
        </article>
    );
}

export default Users;
