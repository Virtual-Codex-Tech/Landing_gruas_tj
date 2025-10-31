import Buttons from '../ui/buttons'
import '../style/banner.css'
import Grua from '../assets/grua.jpg'

export default function Banner(){
    return (
        <div className="container">
            <div className="image-container">
                <img className='img' src={Grua} alt="Grúa" />
                <div className="button-overlay">
                     <div className='text-container'>
                        <h1 className='text-principal'>Tu solución de transporte</h1>
                        <p >Servicio de grúas y transporte confiable , seguro y profesional para todo tipo de vehiculos y maquinaria</p>
                </div >
                    <Buttons className="button" />
                </div>
            </div>
        </div>
    )
}