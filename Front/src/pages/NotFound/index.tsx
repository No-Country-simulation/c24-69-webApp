import Lottie from "lottie-react";
import animationData from "../../assets/404-animation.json";

const NotFound = () => {
    return (
    <div className="banner-container">
        <div className="container-404">
            <p className="text-404">
                4
                <Lottie 
                    animationData={animationData} 
                    loop 
                    className="animation-404" 
                />
                4
            </p>
            <h1 className="title underline mb-4">Page Not Found! We can't find it...</h1>
            <p className="text-active text-center">Something went wrong! Please, come back to our Home Page or explore some of our websites.</p>
        </div>
    </div>
    );
};

export default NotFound;