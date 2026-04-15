# 🏆 Simulador de Copa do Mundo

Este projeto foi desenvolvido como parte de um processo seletivo para estágio em desenvolvimento de software.

A aplicação simula uma Copa do Mundo completa, desde a fase de grupos até a final, utilizando dados reais de uma API fornecida pela empresa.

---

## 🚀 Tecnologias utilizadas

* React (Vite)
* JavaScript (ES6+)
* HTML5 e CSS3

---

## 📌 Funcionalidades

* Consumo de API para obter as 32 seleções
* Distribuição aleatória das equipes em 8 grupos (A–H)
* Simulação completa da fase de grupos
* Cálculo de pontuação (vitória, empate)
* Classificação automática dos 2 melhores de cada grupo
* Simulação das fases eliminatórias:

  * Oitavas de final
  * Quartas de final
  * Semifinal
  * Final
* Simulação de pênaltis em caso de empate no mata-mata
* Exibição do campeão final

---

## ⚙️ Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/Gbmonte9/world-cup-simulator.git

# Acesse a pasta do projeto
cd world-cup-simulator

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

---

## ⚠️ Observação importante (CORS)

A API fornecida possui restrição de CORS, o que impede o envio do resultado final diretamente pelo navegador (frontend).

Por esse motivo:

* O envio do campeão via POST pode ser bloqueado em ambiente local
* A requisição funciona normalmente em ferramentas como Postman ou via backend

Mesmo assim, toda a lógica de envio foi implementada no projeto.

---

## 📁 Estrutura do projeto

```
src/
 ├── components/
 ├── services/
 ├── utils/
 ├── pages/
 └── App.jsx
```

---

## 🎯 Objetivo

Demonstrar habilidades em:

* Consumo de APIs
* Manipulação de dados
* Lógica de programação
* Organização de código em React
* Simulação de sistemas reais

---

## 👨‍💻 Autor

**Gabriel Monte**  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/gabriel-rodrigues-mt/)

---

## 📌 Observação final

O projeto foi desenvolvido com foco em clareza, organização e fidelidade aos requisitos propostos no desafio.
