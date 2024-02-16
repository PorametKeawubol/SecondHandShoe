import React, { useState, useEffect} from 'react';
import Header from '../Component/Header'
import Pfp from '../Component/Picture/ProfilePic.png';

function Profile() {

    return (
        <div>
            <Header/>
            <header className="bg-black py-1" style={{ backgroundColor: '#676666', display: 'flex'}}></header>
            <header className="bg-black py-30" style={{ backgroundColor: 'black', display: 'flex', top: 'center'  }}>
                <div className="px-4 lg:px-8" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Pfp} alt="Profile Picture" className="mr-4" style={{ maxWidth: '400px' }} />
                    <div>
                        <h1 style={{ fontSize: '30px' ,color: 'white' }}>Username</h1>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Profile;
