import React from 'react'
import UpdateSiteInfo from './UpdateSiteInfo';
import UserLayout from '../../../highorder-components/UserLayout';

function ManageSite() {
    return (
        <UserLayout>
            <div className="site_info_title">
                <h2>MANAGE SITE</h2>
            </div>
            <UpdateSiteInfo/>    
        </UserLayout>
    )
}

export default ManageSite
