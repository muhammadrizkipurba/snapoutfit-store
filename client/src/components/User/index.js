import React from "react";
import UserLayout from "../../highorder-components/UserLayout";
import MyButton from "../utils/Buttons";
import HistroryTransactionBlock from "../utils/HistroryTransactionBlock";

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel pt-0 pl-4 mt-0 bg-none">
          <h4 className="panel_title">
            User Information
          </h4>
          <div className="user_data bg-none">
            <p>
              Name <span className="ml-5 mr-3">:</span>
              <span>
                {user.userData.name}
              </span>
            </p>
            <p>
              Last Name <span className="ml-3 mr-3">:</span>{" "}
              <span>
                {user.userData.lastname}
              </span>
            </p>
            <p>
              Email <span className="ml-5 mr-3 pl-1">:</span>{" "}
              <span className="text-lowercase">
                {user.userData.email}
              </span>
            </p>
          </div>
          <MyButton
            type="default"
            title="EDIT USER INFORMATION"
            linkTo="/user/edit_profile"
          />
        </div>

        { user.userData.history ? 
            <div className="user_nfo_panel mt-0">
              <h4 className=" panel_title">
                Transaction History
              </h4>
              <div className="user_product_block_wrapper">
                <HistroryTransactionBlock 
                  products={user.userData.history} 
                />
              </div>
            </div>
          :null }
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
