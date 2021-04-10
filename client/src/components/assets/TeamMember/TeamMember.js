import React from 'react'

export default function TeamMember({name, imgsrc, position, github, linkedin, email, twitter}) {
    return (
         <li class="team-member">
            <div class="our-team" data-aos="zoom-in" data-aos-duration="3000ms">
                <div class="pic">
                    <img src={imgsrc} />
                </div>
                <div class="team-content">
                    <h3 class="title">{name}</h3>
                    <span class="post">{position}</span>
                </div>
                <ul class="social">
                    <li><a href={email} class="fa fa-envelope"></a></li>
                    <li><a href={github} class="fab fa-github"></a></li>
                    <li><a href={twitter} class="fab fa-twitter"></a></li>
                    <li><a href={linkedin} class="fab fa-linkedin"></a></li>
                </ul>
            </div>
        </li>   
    )
}
