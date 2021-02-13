import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <div>
                <Link to="/">
                    Learn.Build.<span>Type.</span>
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/highScores">High Scores</Link></li>
                </ul>
            </div>
        </nav>
    )
}