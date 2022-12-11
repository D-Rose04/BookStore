import React from 'react';
import './css/libro.css'

const Libro = (props) => {

    // label props values
    const {title, image, writtenBy, price } = props;

    return (
        <div className="templatemo_product_box">
            <h1>{title} <span>({writtenBy})</span></h1>
            <img src= {`images/${image}.jpeg`} "images/{}.jpeg" alt="image"/>
            <div className="product_info">
                <p>Escrito por {writtenBy}...</p>
                <h3>${price}</h3>
                {/*TODO*/}
                <div className="buy_now_button"><a href="subpage.html">Comprar</a></div>
                <div className="detail_button"><a href="subpage.html">Detalles</a></div>
                {/*TODO*/}
            </div>
            <div className="cleaner">&nbsp;</div>
        </div>
    );
}

export default Libro;