import React, { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';


export function BlurHashForList({ hash, low, medium, name }) {
    const [imgLowLoading, setImgLowLoading] = useState(false);
    const [imgMediumLoading, setImgMediumLoading] = useState(false);

    return (
        <Fragment>
            {!!hash ? (
                <div
                    style={{ display: imgLowLoading ? "none" : "block" }}
                    className={cn('absolute inset-0 h-full w-full')}>
                    <Blurhash
                        title={"blurhash " + name}
                        hash={hash}
                        style={{ display: "block" }}
                        resolutionX={32}
                        resolutionY={32}
                        height="100%"
                        width="100%"
                        punch={1}
                    />
                </div>
            ) : null}
            <div
                onLoad={() => setImgLowLoading(true)}
                style={{ backgroundImage: imgMediumLoading ? `` : `url(${low})` }}
                className="animate-placeholder absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
            >
                <img
                    src={medium}
                    alt={'image ' + name}
                    sizes='(max-width: 600px) 140px, 200px'
                    onLoad={() => setImgMediumLoading(true)}
                    style={{ display: imgMediumLoading ? "block" : "none" }}
                    className="h-full w-full object-cover object-center"
                />
            </div>
        </Fragment >
    );
}


export function BlurHashForCategories({ hash, low, medium, name, className }) {
    const [imgLowLoading, setImgLowLoading] = useState(false);
    const [imgMediumLoading, setImgMediumLoading] = useState(false);

    return (
        <div
            onLoad={() => setImgLowLoading(true)}
            style={{ backgroundImage: imgMediumLoading ? `` : `url(${low})` }}
            className={cn("relative w-[110px] h-[76px] md:w-40 md:h-[104px] bg-center bg-no-repeat bg-cover transition-opacity duration-300 ease-linear rounded-lg overflow-hidden", className)}
        >
            <img
                src={medium}
                title={"categories " + name}
                alt={"image categories " + name}
                onLoad={() => setImgMediumLoading(true)}
                style={{ display: imgMediumLoading ? "block" : "none" }}
                className={cn("w-full h-full bg-slate-500 transition-opacity duration-150 ease-linear object-cover", {
                    "opacity-100": imgMediumLoading,
                    "opacity-0": !imgMediumLoading,
                })}
            />
            {!!hash && (
                <Blurhash
                    title={"blurhash " + name}
                    hash={hash}
                    resolutionX={32}
                    style={{ display: imgLowLoading ? "none" : "block" }}
                    resolutionY={32}
                    height={"100%"}
                    width={"100%"}
                    punch={1}
                />
            )}
        </div>
    );
}
