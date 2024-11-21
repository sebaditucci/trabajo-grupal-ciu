import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {CardFabricante, CardComponente} from '../Components/CardsDetalles';
import styles from '../Styles/detalles.module.css'

export default function Detalles() {
  const {id} = useParams();
  const [productoF, setFabricantes] = useState([])
  const [productoC, setComponentes] = useState([])

  const fetchData = async () => {
    try {
      const responseF = await fetch(`http://localhost:5000/productos/${id}/fabricantes`)
      const responseC = await fetch(`http://localhost:5000/productos/${id}/componentes`)
      const dataF = await responseF.json()
      const dataC = await responseC.json()
      setFabricantes(dataF)
      setComponentes(dataC)
    } catch (error) {
      console.error('Error al obtener los datos:', error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  if (!productoF?.Fabricantes) {
    return <p>Cargando datos de los fabricantes</p>;
  }

  if (!productoC?.Componentes) {
    return <p>Cargando datos de los componentes</p>;
  }

  return (
    <div className = {styles.detalles} >
      <div className = {styles.datos}>
        <img src = {`../../public/${productoC.pathImg}`} className = {styles.img} title = {`${productoC.nombre}`} 
        alt = {`imagen de un/a ${productoC.nombre}`} loading = "lazy"/>
        <p className = {styles.nombre}>{productoC.nombre}</p>
        <p>{productoC.descripcion}</p>
        <p>${productoC.precio}</p>
      </div>
      <div>
        <p className = {styles.titulo}>Fabricantes</p>
        {productoF.Fabricantes.map((fabricante) => (
          <CardFabricante fabricante = {fabricante}/>
        ))}
      </div>
      <div>
        <p className = {styles.titulo}>Componentes</p>
        {productoC.Componentes.map((componente) => (
            <CardComponente componente = {componente}/>
          ))}
      </div>
    </div>
  )
}