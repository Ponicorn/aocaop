import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import departement from '../departement'
import AO from '../aoc-aop'

const layerurl = 'http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png'

const attribution = ''
const mapCenter = [46.50, 2.20]

function onEachFeature(feature, layer) {
  const dep = AO.departement[feature.properties.code_insee]
  let popup = `<h2>${feature.properties.nom}</h2>`
  if (dep && dep.specialite) {
    const specialite = dep.specialite.map(s => `<div>${s.nom} <span>(${s.total})</span></div>`).join('')
    popup += `<div class="specialiteFlex">${specialite}</div>`
  }
  layer.bindPopup(popup)
}

class Carte extends React.Component {
  render() {
    return (
      <div className="leaflet-wrapper">
        <Map center={mapCenter} zoom={5}>
          <TileLayer attribution={attribution} url={layerurl} />
          <GeoJSON data={departement} onEachFeature={onEachFeature} />
        </Map>
      </div>
    )
  }
}

export default Carte
