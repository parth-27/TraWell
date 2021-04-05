import React from 'react';
import Information from '../../components/ProfileComponents/Information/Information';
import {UserTabs} from '../../components/ProfileComponents/Tabs/UserTabs';
import './Profile.css';

export const Profile = () => {
    return (
        <>
            <div id="profile">
                <Information />
                <div id="user-tabs">
                    <UserTabs />
                </div>
            </div>
        </>
    )
}
