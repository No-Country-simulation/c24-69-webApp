import thirdIlust from '../../../assets/Ilus1.jpg'
import thirdBackground from '../../../assets/red-blue BKG.jpg'

const ThirdBanner = () => {
    return (
<div className="banner-container">
    <img src={thirdBackground} alt="First Background" className="banner-background" />
    
    <div className="custom-grid">
        <img src={thirdIlust} alt="First Banner Image" className="ilustration" />
        <div className='special-text-background'>
            <p className="paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod perspiciatis ad possimus consequuntur aut, beatae veritatis molestiae obcaecati ex quae et sequi ipsam enim suscipit minima corrupti ipsum. Rem, earum.
            </p>
        </div>
    </div>
</div>
    )
}

export {ThirdBanner};