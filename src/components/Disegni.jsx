import "./index.css"

function Disegni(props){
    
    const drawingsElement = props.drawings.map(draw => (
        <div key={draw.id} className="sec-drawing">
            <div>
                {draw.drawingSrc ? "" : <input type="file" onChange={(event) => props.onChangeDrawing(event, draw.id)} className="filetype" />}
                {draw.drawingSrc ? <button onClick={(event) => props.deleteDrawing(event, draw.id)} >Delete</button> : ""}
            </div>
            {draw.drawingSrc ? <img className="sec-img" src={draw.drawingSrc} alt="inserisci immagine" /> : ""}
            {draw.drawingSrc ? <input className="sec-desc" type="text" onChange={(event) => props.onChangeText(event, draw.id)} value={draw.drawingDesc} placeholder = "Descrizione" /> : ""}
        </div>
    ))

    return(
    <div className="main-drawing-container">
        <div className="main-drawing">
            <div>
                {props.mainImage ? "" : <input type="file" onChange={props.onImageChange} className="filetype" />}
                {props.mainImage ? <button onClick={props.mainImageReset}>Reset</button> : ""}
            </div>
            {props.mainImage ? <img className="main-img" src={props.mainImage} alt="inserisci immagine" /> : <h1></h1>}
            {props.mainImage ? <input className="main-draw-desc" type="text" value={props.mainDesc} onChange={props.onChangeMainText} placeholder = "Descrizione" /> : ""}
        </div>
        <div className="draw-grid">
            {drawingsElement}
        </div>
        <button className="new-drawing" onClick={props.newDrawing}>new drawing</button>
    </div>  
    )
}

export default Disegni