type Props = {
    video: string;
    hasBorder: boolean;
    borderColor: string;
}

export default function Video({content} : {content: Props}) {
    const {video, hasBorder, borderColor} = content
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
            style={{
                borderColor: (borderColor? borderColor: '#000000'),
            }}
        >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
      </video>
    )
}