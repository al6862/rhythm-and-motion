type Props = {
    video: string;
    hasBorder: boolean;
}

export default function Video({content} : {content: Props}) {
    const {video, hasBorder} = content
    return(
        <video
            width="1920"
            height="1080"
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            className={`max-md:min-h-[80rem] size-full object-cover` + (hasBorder? ` border-[1.6rem] md:border-[6rem]` : ``)}
        >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
      </video>
    )
}