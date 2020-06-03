import React from 'react';

import './GithubLink.scss';

const GithubLink = () => {
    return (
        <div className="GithubLink">
            <a href="https://github.com/bdell/goto.pizza" target="_blank" rel="noopener noreferrer">
                <img src={`${process.env.PUBLIC_URL}/GitHub-Mark-64px.png`} alt="Github Link" />
            </a>
        </div>
    );
};

export default GithubLink;
