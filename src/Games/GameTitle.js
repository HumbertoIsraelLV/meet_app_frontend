import React from "react";

const GameTitle = ({title, instructions}) => {
    return (
        <div className="result memorama-title">
          <blockquote class="blockquote text-center">
            <p class="mb-4">{title}</p>
            <footer class="blockquote-footer text-white">{instructions}</footer>
          </blockquote> 
        </div>
    );
}

export default GameTitle;