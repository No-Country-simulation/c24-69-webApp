import { First_Interactive_Banner } from "../../components/Banners/HomeBanner 1/index";
import { Second_Interactive_Banner } from "../../components/Banners/HomeBanner 2";


const Home = () => {
return (
    <div className="flex flex-col justify-between">
        <First_Interactive_Banner />
        <Second_Interactive_Banner/>
    </div>
)
}

export default Home;