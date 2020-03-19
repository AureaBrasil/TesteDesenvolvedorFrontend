# Front End Developer (JavaScript, React e Redux)

### Este é um projeto que utiliza as tecnologias React, JavaScript e Redux para consumo de uma API REST local

Obs: Este foi meu primeiro projeto utilizando a tecnologia React e Redux !!! Foi desenvolvido para realização de um teste de Desenvolverdor Web para a **GS Ciência do Consumo**, 
o tema do projeto trata-se de um site de roupas femininas, onde é possível escolher alguns modelos de roupas, adiciona-las ao carrinho e vizualizar o preço total e quantidade.

No desenvolvimento do teste foram utilizadas as seguintes tecnologias: 

* React
* Redux
* JavaScript
* EcmmaScript 
* SASS/CSS
* HTML
* JSON
* Material UI

### Nota

**Antes de seguir os passos para executar o projeto é necessário ter instalados em sua máquina:**

* nodejs e npm <https://nodejs.org/en/>
* SASS <https://sass-lang.com/install>
* JsonServer <https://www.npmjs.com/package/json-server>

## Executando o Projeto

#### Se for a primera vez utilizando o projeto use __npm install__ para instalar todas as dependências necessárias

> npm install


#### Iniciar o JsonServer que irá rodar em http://localhost:3000/produtos

> json-server --watch rest-api/products.json 

#### Iniciar a aplicação em React 

> npm start
 
Obs.: O comando **start** no npm em package.json pode sofrer alterações dependendo do seu sistema operacional 

```npm
"scripts": {
    "start": "set PORT=3001 && react-scripts start" 
```

No caso acima o comando start está correto para rodar no Windows, caso esteja utilizando MacOS ou Linux alterar para:

> "PORT=3006 react-scripts start"