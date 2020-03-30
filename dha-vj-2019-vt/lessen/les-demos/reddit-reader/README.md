# Reddit Reader in TypeScript

Een kleine console line reddit reader in Typescript

## Instructies
Maak gebruik van de reddit json api: (https://www.reddit.com/r/<subreddit>.json).

Je mag de onderstaande interfaces gebruiken om weg geholpen te worden:
```ts
interface TopicInfo {
  title:string,
  url: string,
  created:number
}

interface RedditTopic {
  data: TopicInfo
}
```

* Schrijf een class die in een member-method de data ophaalt
* Een andere member-method toont het op het scherm
* gebruik eventueel de index.ts in deze folder als start punt
