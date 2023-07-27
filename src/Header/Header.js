import React from "react";
import "./Header.css";
import { ReactComponent as Logo } from './logo.svg';

export default function Header({ searchTerm, handleSearch }) {
    return (
        <div className="Head">
            <Logo className="logo" />
            <div className="input">
                <h1 className="heading">The best free stock photos, royalty free images & videos shared by creators.</h1>
                {/* Move the search input box and use the handleSearch function */}
                <input
                    className="Search"
                    type="text"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

