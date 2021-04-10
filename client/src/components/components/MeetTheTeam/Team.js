import React from 'react'
import './Team.css'
import TeamMember from "./../../assets/TeamMember/TeamMember"

function Team(){
    return (
        <div className="team">
            <div className="team-title">
                <p> Meet the Team</p>
            </div>
            <hr className="hrline" />
            <div className="team-container" >
                <div className="team-wrapper">
                    <div className="team-content-container">
                        <div className="team-content-wrapper">
                            <ul className="team-row">
                                <TeamMember 
                                    name="Shreyansh Shah" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Back-End Developer"
                                    github="https://github.com/shreyanshah27"
                                    email="shreyansh.s@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                                
                                <TeamMember 
                                    name="Yashvi Pipaliya" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Documentation Head"
                                    github="https://github.com/"
                                    email="yashvi.p@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />

                                <TeamMember 
                                    name="Parth Patel" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Front-End Developer"
                                    github="https://github.com/parth-27"
                                    email="parth.p1@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                                
                                
                            </ul>
                            <ul className="team-row">
                                <TeamMember 
                                    name="Manal Shah" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Designer"
                                    github="https://github.com/"
                                    email="manal.s@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                                
                                <TeamMember 
                                    name="Manav Vagrecha" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Front-End Developer"
                                    github="https://github.com/caped-crusader16"
                                    email="manavkumar.v@ahduni.edu.in"
                                    twitter="https://twitter.com/ManavVagrecha"
                                    linkedin="https://www.linkedin.com/in/manav-vagrecha-03160819b/"
                                />
                                <TeamMember 
                                    name="Kesha Bagadia" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Designer"
                                    github="https://github.com/"
                                    email="kesha.b@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                            </ul>
                            <ul className="team-row">
                                <TeamMember 
                                    name="Jeet Shah" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Back-End Developer"
                                    github="https://github.com/jds311"
                                    email="jeet.s3@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />

                                <TeamMember 
                                    name="Yashvi Gandhi" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Back-End Developer"
                                    github="https://github.com/"
                                    email="gandhi.p@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                                
                                
                                <TeamMember 
                                    name="Mihir Chauhan" 
                                    imgsrc="team-members/gogeta.png"
                                    position="Back-End Developer"
                                    github="https://github.com/"
                                    email="mihir.c@ahduni.edu.in"
                                    twitter="https://twitter.com/"
                                    linkedin="https://www.linkedin.com/in/"
                                />
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team;
