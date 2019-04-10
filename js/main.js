searchKey = (searchedKey) => {
  let searchField = document.getElementById('searchField');
  if (searchedKey === undefined) {
    searchedKey = searchField.value;
  } else {
    searchField.value = searchedKey;
  }

  const foundKeys = data.keys.filter(x => x[0].toLowerCase().indexOf(searchedKey.toLowerCase()) != -1);
  let output = [];

  for (const key of foundKeys) {
    let sources = [];

    for (const src of key[1]) {
      const sourceIsNull = src[0] == null,
            source = sourceIsNull ? 'Viz:' : data.sources.find(x => x[0] == src[0])[1],
            sourceValues = sourceIsNull ? src[1][0].substring(5).split(', ') : src[1];
      let values = [];

      for (const val of sourceValues) {
        values.push(sourceIsNull 
          ? `<li><a href="#" onclick="searchKey('${val}');">${val}</a></li>` 
          : `<li>${val}</li>`);
      }

      sources.push(`<div class="source"><h3>${source}</h3><ul>${values.join('')}</ul></div>`);
    }

    output.push(`<div class="key"><h2>${key[0]}</h2>${sources.join('')}</div>`);
  }

  document.getElementById('resultBox').innerHTML = output.join('');
};

window.addEventListener('load', async () => {
  navigator.serviceWorker
    .register('/Snar/sw_cached_files.js')
    .then(reg => console.log('Service Worker: Registered'))
    .catch(err => console.log(`Service Worker: Error: ${err}`));
});
