import JsPDF from 'jspdf'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import Descrizione from "./components/Descrizione"
import Disegni from "./components/Disegni"
import './components/index.css'

function App() {

  const [title, setTitle] = useState(() => JSON.parse(localStorage.getItem("title")) || "")
  const [occ, setOcc] = useState(() => JSON.parse(localStorage.getItem("occ")) || "")
  const [description, setDescription] = useState(() => JSON.parse(localStorage.getItem("description")) || "")
  const [mainImage, setMainImage] = useState(() => JSON.parse(localStorage.getItem("main")) || null)
  const [mainDesc, setMainDesc] = useState(() => JSON.parse(localStorage.getItem("desc")) || "")
  const [drawings, setDrawings] = useState(() => JSON.parse(localStorage.getItem("draw")) || [])

  const [larghezza, setLarghezza] = useState("")
  const [altezza, setAltezza] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(title))
  }, [title])

  useEffect(() => {
    localStorage.setItem("occ", JSON.stringify(occ))
  }, [occ])

  useEffect(() => {
    localStorage.setItem("description", JSON.stringify(description))
  }, [description])
  
  useEffect(() => {
    localStorage.setItem("main", JSON.stringify(mainImage))
  }, [mainImage])

  useEffect(() => {
    localStorage.setItem("desc", JSON.stringify(mainDesc))
  }, [mainDesc])

  useEffect(() => {
    localStorage.setItem("draw", JSON.stringify(drawings))
  }, [drawings])
  
  function newDrawing(){
    const drawing = {
      id: nanoid(),
      drawingSrc: null,
      drawingDesc: ""
    }
    setDrawings(old => [drawing, ...old])
  }

  function onImageChange(event){
    if (event.target.files && event.target.files[0]) {
        setMainImage(URL.createObjectURL(event.target.files[0]));
        }
  }

  function mainImageReset(){
    setMainImage(null)
  }

  function onChangeMainText(event){
    setMainDesc(event.target.value)
  }

  function onChangeDrawing(event, id){
    event.stopPropagation()
    if (event.target.files && event.target.files[0]){
    setDrawings(old=>{
      const newDraw = old.map((draw)=>{
          if (draw.id == id)
          draw.drawingSrc = URL.createObjectURL(event.target.files[0])
          return draw
      })
    return newDraw
    })}
  }

  function onChangeText(event, id){
    event.stopPropagation()
    setDrawings(old=>{
      const newDraw = old.map((draw)=>{
          if (draw.id == id)
          draw.drawingDesc = event.target.value
          return draw
      })
    return newDraw
    })
  }

  function deleteDrawing(event, id) {
    event.stopPropagation()
    setDrawings(oldDraw => oldDraw.filter(old => old.id !== id))
  }

  const generatePDF = () => {
    if (larghezza && altezza){
      setError("")
      const report = new JsPDF('portrait','px',[larghezza, altezza])
      report.html(document.querySelector('#root')).then(() => {
          report.save('report.pdf')
      })
    } else {setError("Inserire dimensioni!")}
  }

  function larghezzaF(event){
    event.stopPropagation()
    setLarghezza(old => event.target.value)
  }

  function altezzaF(event){
    event.stopPropagation()
    setAltezza(old => event.target.value)
  }

  function changeTitle(event){
    event.stopPropagation()
    setTitle(old => event.target.value)
  }

  function changeOcc(event){
    event.stopPropagation()
    setOcc(old => event.target.value)
  }

  function changeDescription(event){
    event.stopPropagation()
    setDescription(old => event.target.value)
  }
    
  return (
    <div className='main-container'>
      <Descrizione
        title = {title}
        occ = {occ}
        description = {description}
        changeTitle = {changeTitle}
        changeOcc = {changeOcc}
        changeDescription = {changeDescription}
      />
      <Disegni
        mainImage = {mainImage}
        mainDesc = {mainDesc}
        drawings = {drawings}
        onImageChange = {onImageChange}
        mainImageReset = {mainImageReset}
        onChangeMainText = {onChangeMainText}
        onChangeDrawing = {onChangeDrawing}
        onChangeText = {onChangeText}
        newDrawing = {newDrawing}
        deleteDrawing = {deleteDrawing}
      />
      <div className='export'>
        <button onClick={generatePDF} type="button">Export PDF</button>
        <p>Larghezza</p><input type="number" placeholder = '1905' value={larghezza} onChange={(event) => larghezzaF(event)} />
        <p>Altezza</p><input type="number" placeholder = '3000' value={altezza} onChange={(event) => altezzaF(event)} />
        <h3>{error}</h3>
      </div>
    </div>
  )
}

export default App