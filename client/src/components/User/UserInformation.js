import React from 'react'
import UserLayout from '../../highorder-components/UserLayout';
import UpdateUserInfo from './UpdateUserInfo';


function UserInformation(props) {
    const user = props.user.userData;

    return (
        <UserLayout>
            <div className="user_info">
                <h1 className="user_info_title">
                    Hi,{" "}
                    <span>
                        {user.name} {user.lastname}
                    </span>
                </h1>
                Want to edit your info ? Fill the form below
            </div>
            <UpdateUserInfo />
        </UserLayout>
    );
}

export default UserInformation
