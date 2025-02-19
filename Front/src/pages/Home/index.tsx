import { FirstBanner } from "../../components/Banners/HomeBanner 1/index";
import { SecondBanner } from "../../components/Banners/HomeBanner 2/index";
import { ThirdBanner } from "../../components/Banners/HomeBanner 3";
import { FourthBanner } from "../../components/Banners/HomeBanner 4";

const Home = () => {
return (
    <div className="flex flex-col justify-between">
        <FirstBanner />
        <SecondBanner />
        <ThirdBanner/>
        <FourthBanner/>
    </div>
)
}

export default Home;