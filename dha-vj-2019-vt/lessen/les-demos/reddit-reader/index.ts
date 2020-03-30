async function getData (subreddit:string) {
  var data = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .catch(err => console.error(err))
  return data
}


async function render() {
  const data = await getData('simulated')
  console.log(data)

  return data
}

render()