import React from "react";

const Result = ({isWinner, points}) => {
    var final_points=points;
    if(!final_points)
        final_points=isWinner?2:1;
    return (
        <div className={isWinner?"result green": "result red"}>
          <blockquote class="blockquote text-center">
            <p class="mb-4">{isWinner?"¡GANASTE!":"PERDISTE"}</p>
            <footer class="blockquote-footer text-white">Acumulas {final_points} {final_points==1?"punto":"puntos"}</footer>
          </blockquote> 
        </div>
    );
}

export default Result;