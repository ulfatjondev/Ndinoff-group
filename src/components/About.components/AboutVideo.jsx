import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube";

const AboutVideo = ({ videoUrl }) => {
  return (
    <div className="container mx-auto my-20 h-[40vh] mdLh-[30vh] lg:h-[60vh]">
      <h1 className="text-[25px] md:text-[35px] lg:text-[40px] text-center my-5">
        Mahsulot tayyorlanishidan lavhalar
      </h1>
      <div className="mx-auto h-[100%] md:h-[100%] lg:h-[95%] flex justify-center items-center">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          playing={false}
          width="95%"
          height="100%"
          className="w-full h-full" 
        />
      </div>
    </div>
  );
};

AboutVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default AboutVideo;
