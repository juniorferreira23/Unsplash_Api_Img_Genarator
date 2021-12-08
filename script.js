var input = document.querySelector('#input')
input.addEventListener('keydown', (event) => {
  if(event.key == 'Enter'){
    apiRequest()
  }
})

document.querySelector('#search').addEventListener('click', () => {
  apiRequest()
})

const apiRequest = () => {
  document.querySelector('#grid').textContent = ''

  const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo'

  fetch(url)

  .then(response => {
    if(!response.ok) throw Error(response.statusText)
    return response.json()
  })

  .then(data => {
    loadImage(data)
    console.log(data)
  })

  .catch(error => console.log(error))
}

const loadImage = (data) => {
  for(let i=0 ; i < data.results.length; i++){
    let divImage = document.createElement('div')
    divImage.className = 'img'
    divImage.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`
    divImage.addEventListener('dblclick', () => {
      window.open(data.results[i].links.download, '_black')
    })
    document.querySelector('#grid').appendChild(divImage)
  }
}