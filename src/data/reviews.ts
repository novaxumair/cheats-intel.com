export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  body: string
}

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Alex Rivera',
    role: 'Immortal player',
    game: 'Valorant',
    rating: 5,
    body: 'Finally a place that shows what ships, what broke after the patch, and what ranked players are actually running.',
  },
  {
    id: '2',
    author: 'Jordan Lee',
    role: 'Warzone ranked',
    game: 'Warzone',
    rating: 5,
    body: 'Clear feature lists and honest status notes. Saved me from buying a dead build after a mid-season patch.',
  },
  {
    id: '3',
    author: 'Sam Okonkwo',
    role: 'Rust main',
    game: 'Rust',
    rating: 4,
    body: 'Guides are straight — aimbot, ESP, spoofer coverage without the Telegram spam. Easy to compare titles.',
  },
  {
    id: '4',
    author: 'Casey Nguyen',
    role: 'Siege stack',
    game: 'Rainbow Six Siege',
    rating: 5,
    body: 'Patch tracking is solid. I use Gaming Briefs before every season to see what still holds up.',
  },
  {
    id: '5',
    author: 'Riley Brooks',
    role: 'Tarkov wipe prep',
    game: 'Escape from Tarkov',
    rating: 4,
    body: 'Buyer notes and feature breakdowns are better than storefront blurbs. Wish more sites did this.',
  },
  {
    id: '6',
    author: 'Morgan Ellis',
    role: 'DayZ survivor',
    game: 'DayZ',
    rating: 5,
    body: 'Clean layout, fast to scan, and the Get link goes where it should. No fake prices on the guide pages.',
  },
]
