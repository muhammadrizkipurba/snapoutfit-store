import React from "react";
import UserLayout from "../../../highorder-components/UserLayout";
import ManageBrand from "./ManageBrand";
import ManageColor from "./ManageColor";

function ManageCategories() {
    return (
        <UserLayout>
            <div className="pl-5">
                <ManageBrand />
                <ManageColor />
            </div>
        </UserLayout>
    )
}

export default ManageCategories
