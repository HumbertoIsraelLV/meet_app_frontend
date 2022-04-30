import React from "react";

const Tables = ({ sessions }) => {
    const columns = ["#", "Fecha de la reunión", "Hora de la reunión", "Nombre del profesor", "Estudiantes"];
    return (
    <>
        <row>
            <h1>Puntajes de las reuniones</h1>
        </row>
        <row>
            <table className="table table-striped table-bordered">
            <thead>
                {columns.map(column => <th>{column}</th>)}
            </thead>
            <tbody>
                {sessions.map((session, i) => (
                <tr>
                    <td>{i+1}</td>
                    <td>{new Date(session["start_date"]).toLocaleDateString()}</td>
                    <td>{new Date(session["start_date"]).toLocaleTimeString()}</td>
                    <td>{session["teacher"]["name"]}</td>
                    <td>
                        <table className="table">
                            <thead>
                            <th>Nombre</th>
                            <th>Puntaje</th>
                            </thead>
                            <tbody>
                            {session["students"].map((student) => 
                            <tr>
                                <td>{student["name"]}</td>
                                <td>{student["score"]}</td>
                            </tr>)}

                            </tbody>
                        </table>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

        </row>
    </>
  );
};

export default Tables;