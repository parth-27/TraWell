import React, { Component } from 'react';

import { Image } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <>
                <div style={{ width: '80%', marginRight: 'auto', marginLeft: 'auto',textAlign:"center" }}>
                    <Image src="https://c4.wallpaperflare.com/wallpaper/591/844/1024/spider-man-spider-video-games-superhero-wallpaper-preview.jpg" fluid />
                </div>
            </>
        )
    }
}