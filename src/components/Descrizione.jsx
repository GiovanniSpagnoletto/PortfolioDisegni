import "./index.css"

function Descrizione(props){
    return(
        <div className="main-desc">
            <input className="name" type="text" value={props.title} onChange={props.changeTitle} placeholder = "Nome" />
            <input className="occ" type="text" value={props.occ} onChange={props.changeOcc} placeholder = "Occupazione" />
            <textarea className="desc" value={props.description} onChange={props.changeDescription} placeholder = "Descrizione" />
        </div>
    )
}

export default Descrizione