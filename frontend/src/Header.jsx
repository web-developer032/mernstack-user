import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <Link to={"/"}>Home</Link>

            <ul>
                <li>
                    <Link to={"/users"}>Users</Link>
                </li>

                <li>
                    <Link to={"/addUser"}>Add User</Link>
                </li>
            </ul>
        </nav>
    );
}
