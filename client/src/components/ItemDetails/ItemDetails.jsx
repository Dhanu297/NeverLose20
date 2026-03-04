import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";

function ItemDetailPage() {
    return(
    <MainLayout>
        <div style={{padding:"0px"}}>
            <h2>Item Details page</h2>
            <p>This is working</p>
        </div>

  
    </MainLayout>
    );
}

export default ItemDetailPage;