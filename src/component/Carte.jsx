import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import AO from '../aoc-aop'

/**
 * Fait le liens entre un departement et les data correspondant
 * @param {Object} feature 
 * @param {Object} layer 
 */
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
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: [46.50, 2.20],
      attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      layerurl: 'http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
      departement: { type: 'FeatureCollection', features: [] },
      geojsonKey: 'ko', // Permet de forcer la reconstruction total d'un element sur un render
    }

    fetch('public/data/departement.json')
      .then(data => data.json())
      .then(data => this.setState({ departement: data, geojsonKey: 'ok' }))
      .catch(err => console.error(err))
  }
  render() {
    return (
      <div className="leaflet-wrapper">
        <Map center={this.state.mapCenter} zoom={5}>
          <TileLayer attribution={this.state.attribution} url={this.state.layerurl} />
          <GeoJSON
            key={this.state.geojsonKey}
            data={this.state.departement}
            onEachFeature={onEachFeature}
          />
        </Map>
      </div>
    )
  }
}

export default Carte
