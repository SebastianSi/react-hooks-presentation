import React from "react";
import ItemsList from "./ItemsList";

export default function ItemsContainer() {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ItemsList/>
        </div>
    );
}
