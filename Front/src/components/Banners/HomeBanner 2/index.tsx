import secondIlust from '../../../assets/Ilus2.jpg'
import secondBackground from '../../../assets/blue-orange BKG.jpg'

const SecondBanner = () => {
    return (
<div className="banner-container">
    <img src={secondBackground} alt="First Background" className="banner-background" />
    
    <div className="custom-grid">
        <img src={secondIlust} alt="First Banner Image" className="ilustration" style={{ border: '2px solid #F26932' }}/>
        <div className='text-background' style={{ border: '2px solid #F26932' }}>
            <p className="paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod perspiciatis ad possimus consequuntur aut, beatae veritatis molestiae obcaecati ex quae et sequi ipsam enim suscipit minima corrupti ipsum. Rem, earum.
            </p>
        </div>
    </div>
</div>
    )
}

export {SecondBanner};