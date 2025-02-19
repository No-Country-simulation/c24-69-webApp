import firstIlust from '../../../assets/Ilus0.jpg'
import firstBackground from '../../../assets/blue-gold BKG - copia.jpg'

const FirstBanner = () => {
    return (
<div className="banner-container">
    <img src={firstBackground} alt="First Background" className="banner-background" />
    
    <div className="custom-grid">
        <img src={firstIlust} alt="First Banner Image" className="ilustration" />
        <div className='text-background' style={{ border: '5px solid #FBCE33' }}>
            <p className="paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod perspiciatis ad possimus consequuntur aut, beatae veritatis molestiae obcaecati ex quae et sequi ipsam enim suscipit minima corrupti ipsum. Rem, earum.
            </p>
        </div>
    </div>
</div>
    )
}

export {FirstBanner};