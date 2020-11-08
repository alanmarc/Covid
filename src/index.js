const $map = document.getElementById('map')
const map = new window.google.maps.Map($map, {
  center: {
    lat: 19.0572039,
    lng: -98.2084129
  },
  zoom: 15
})

renderData()
async function getData() {
  const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
  const data = response.json()
  return data
}

function renderItem({ confirmed, deaths, recovered, provincestate, countryregion }) {
  return (`
    <div>
      <p> <strong> ${provincestate} - ${countryregion} </strong></p>
      <p> confirmados: ${confirmed} </p>
      <p> muertes: ${deaths} </p>
      <p> recuperados: ${recovered} </p>
    </div>
  `)
}
const popup = new window.google.maps.InfoWindow()
async function renderData() {
  const data = await getData()
  data.forEach(item => {
    const marker = new window.google.maps.Marker({
      position: {
        lat: item.location.lat,
        lng: item.location.lng
      },
      map,
      title: String(item.confirmed)
    })
    marker.addListener('click', () => {
      popup.setContent(renderItem(item))
      popup.open(map, marker)
    })
  });
}

