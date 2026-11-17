# Recipe App

![Last commit](https://img.shields.io/github/last-commit/IgorMarinhoArgollo/recipe-app)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

🇧🇷 [Leia em português](./README.pt-br.md)

A mobile-first recipe app for meals and drinks, built with **React**. It consumes two public recipe APIs (TheMealDB and TheCocktailDB) and was developed as a team project to practice **Agile (Scrum)** and **pair programming**.

**🔗 Live demo: [project-recipe-app.netlify.app](https://project-recipe-app.netlify.app/)**

To log in, use `email@email.com` as the email and `1234567` as the password.

![Demo](./public/demonstracao.gif)

## About the project

Built during Trybe's Frontend module with four teammates, to practice passing data through props, the Context API and React Hooks. The layout targets small screens (320x640px) first and can be extended to larger ones.

## Features

- Browse and search meals and drinks, with category filters
- Explore recipes by ingredient and by area
- Recipe details and in-progress recipes
- Profile with favorite and done recipes
- Tested with Testing Library (unit and integration) and Cypress (end to end)

## Tech stack

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

Also: Context API, React Hooks, React Router, Axios, Testing Library, Cypress, ESLint and Stylelint.

## Running locally

Requirements: Node.js 16.

```bash
git clone https://github.com/IgorMarinhoArgollo/recipe-app.git
cd recipe-app
npm install
npm start
```

Other scripts: `npm test`, `npm run cy` (Cypress), `npm run lint` and `npm run lint:styles`.

## Team

Developed with:

- [Filipe Onoue](https://github.com/onoue9) · [LinkedIn](https://www.linkedin.com/in/filipeonoue/)
- [Junio Álves](https://github.com/JunioASilva) · [LinkedIn](https://www.linkedin.com/in/junio-alves-da-silva-b795a2217/)
- [Luiz Módolo](https://github.com/LuizModolo) · [LinkedIn](https://www.linkedin.com/in/modololuiz/)
- [Lucas Toledo](https://github.com/lucas-morais) · [LinkedIn](https://www.linkedin.com/in/lucas-m-toledo/)
- **Igor Marinho Argollo** · [LinkedIn](https://www.linkedin.com/in/igormarinhoargollo/) · [Portfolio](https://igor-marinho.netlify.app/)

## License

MIT
