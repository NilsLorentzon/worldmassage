import React from "react";
import "./priser.css"

function Priser() {
    return (
        // <div className="priser">
            <table>
                <thead>
                    <tr>
                        <th>Massage</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>30 min</th>
                        <th>475 kr</th>
                    </tr>
                    <tr>
                        <th>60 min</th>
                        <th>775 kr</th>
                    </tr>
                    <tr>
                        <th>90 min</th>
                        <th>1150 kr</th>
                    </tr>
                </tbody>
            </table>
        // </div>
    )
}

export default Priser;