// Central book database for TheoLib

export const books = [

  {
    id: "bk001",
    title: "Introduction to Artificial Intelligence",
    author: "TheoLib Editors",
    category: "AI",
    cover: "assets/ai1.jpg",
    price: 0,
    monetized: false
  },

  {
    id: "bk002",
    title: "Machine Learning Basics",
    author: "TheoLib Editors",
    category: "AI",
    cover: "assets/ai2.jpg",
    price: 0,
    monetized: false
  },

  {
    id: "bk003",
    title: "Deep Learning Explained",
    author: "TheoLib Research",
    category: "AI",
    cover: "assets/ai3.jpg",
    price: 5,
    monetized: true
  },

  {
    id: "bk004",
    title: "Modern Web Development",
    author: "Community Author",
    category: "Programming",
    cover: "assets/web1.jpg",
    price: 3,
    monetized: true
  },

  {
    id: "bk005",
    title: "JavaScript from Zero",
    author: "TheoLib Community",
    category: "Programming",
    cover: "assets/js1.jpg",
    price: 0,
    monetized: false
  },

  {
    id: "bk006",
    title: "Python for Everyone",
    author: "TheoLib Community",
    category: "Programming",
    cover: "assets/py1.jpg",
    price: 4,
    monetized: true
  },

  {
    id: "bk007",
    title: "Creative Writing Essentials",
    author: "Independent Author",
    category: "Writing",
    cover: "assets/write1.jpg",
    price: 2,
    monetized: true
  },

  {
    id: "bk008",
    title: "Poetry & Expression",
    author: "Community Poet",
    category: "Writing",
    cover: "assets/poetry1.jpg",
    price: 0,
    monetized: false
  },

  {
    id: "bk009",
    title: "Entrepreneurship in Africa",
    author: "Guest Author",
    category: "Business",
    cover: "assets/biz1.jpg",
    price: 5,
    monetized: true
  },

  {
    id: "bk010",
    title: "Financial Literacy Basics",
    author: "TheoLib Finance",
    category: "Business",
    cover: "assets/finance1.jpg",
    price: 3,
    monetized: true
  }

];

/*
Future-ready notes:
- price > 0 → paid book
- monetized true → revenue split applies
- category → used for filters later
*/
