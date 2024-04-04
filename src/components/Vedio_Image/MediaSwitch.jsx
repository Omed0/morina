import React, { useEffect, useState } from 'react';
import { BlurHashForModal } from './BlurHash';


function MediaSwitch({ hash, high, videoSrc }) {

    // make a switch between image and video after 1.5 second 
    const [isVideo, setIsVideo] = useState(false);
    useEffect(() => {
        if (videoSrc) {
            setTimeout(() => {
                setIsVideo(true);
            }, 2000);
        }
    }, []);

    const handleShowVideo = () => {
        if (videoSrc && !isVideo) {
            setIsVideo(true);
        }
    };

    return (
        <>
            <video
                autoPlay
                muted
                playsInline
                onEnded={() => setIsVideo(false)}
            >
                <source src={videoSrc} type="video/mp4" />
            </video >
            <BlurHashForModal
                hash={hash}
                high={high}
                className={"image"}
                onClick={handleShowVideo}
            />
            <style jsx>
                {`
                    .image {
                        ${isVideo ? 'display: none;' : 'display: block;'}
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    video {
                        ${isVideo ? 'display: block;' : 'display: none;'}
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                    }
                `}
            </style>
        </>
    );
}

export default MediaSwitch;
