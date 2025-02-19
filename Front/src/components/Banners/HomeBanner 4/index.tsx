import fourthIlust from '../../../assets/Ilus3.jpg'
import fourtBackground from '../../../assets/rose BKG.jpg'

const FourthBanner = () => {
    return (
<div className="banner-container">
    <img src={fourtBackground} alt="First Background" className="banner-background" />
    
    <div className="custom-grid">
        <img src={fourthIlust} alt="First Banner Image" className="ilustration" style={{ border: '8px solid #EE8887' }} />
        <div className='text-background' style={{ border: '5px solid #EE8887' }}>
            <p className="paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod perspiciatis ad possimus consequuntur aut, beatae veritatis molestiae obcaecati ex quae et sequi ipsam enim suscipit minima corrupti ipsum. Rem, earum.
            </p>
        </div>
    </div>
</div>
    )
}

export {FourthBanner};