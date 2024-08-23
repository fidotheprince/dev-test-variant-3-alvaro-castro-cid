import { useState } from 'react'

function App() {
  //for DD = decimal degrees
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  //for DMS = degrees minutes seconds
  const [latDMS, setLatDMS] = useState('')
  const [longDMS, setLongDMS] = useState('')

  const convertToDMS = (coord) => {
    //handles any strange negative signs
    coord = coord.replace(/[−–]/g, '-');
    const degrees = Math.floor(coord)
    const minutes = Math.floor((coord - degrees) * 60)
    const seconds = Math.floor((coord - degrees - minutes / 60) * 3600)
    return `${degrees}° ${minutes}' ${seconds}"`
  }
  
  const handleChange = (e) => {
    e.target.name === 'lat' && setLatitude(e.target.value);
    e.target.name === 'long' && setLongitude(e.target.value);
  }

  const handleSumbit = (e) => {
    e.preventDefault()
    //reset DD inputs
    setLatitude('')
    setLongitude('')
    //convert DD to DMS
    setLatDMS(convertToDMS(latitude))
    setLongDMS(convertToDMS(longitude))
  }

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
          <label>latitude (DD)</label>
          <input type="text" name="lat" value={latitude} onChange={handleChange}/>
        </div>
        <div>
          <label>longitude (DD)</label>
          <input type="text" name="long" value={longitude} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Convert Coords</button>
        </div>
      </form>
      <div>
        <p>Latidude (DMS): {latDMS} Longitude (DMS): {longDMS}</p>
      </div>
      <div>
      <iframe src={`https://www.google.com/maps?q=${latDMS ? latDMS : '27.75749697'},${longDMS ? longDMS : '-82.54083117'}&output=embed`} width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default App
