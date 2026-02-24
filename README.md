# Conecthus

Conecthus é uma aplicação modernae performática construída com **React 19**, **Vite** e **TypeScript**, focada em oferecer uma experiência de usuário fluida e responsiva. O projeto utiliza **Tailwind CSS 4** para estilização e **Framer Motion** para animações interativas.

## 🚀 Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/) (Ícones)

## 📂 Estrutura do Projeto

```text
conecthus/
├── public/              # Arquivos estáticos públicos
├── src/
│   ├── assets/          # Assets como imagens e logos
│   ├── commons/         # Componentes e recursos compartilhados
│   │   ├── components/  # Componentes reutilizáveis (Input, Table, etc)
│   │   ├── hooks/       # Hooks customizados globais
│   │   ├── layouts/     # Estruturas de layout da página
│   │   └── utils/       # Funções utilitárias
│   ├── features/        # Módulos organizados por funcionalidade
│   │   ├── auth/        # Autenticação e Login
│   │   ├── home/        # Dashboard e tela inicial
│   │   └── users/       # Gestão de usuários
│   ├── routes/          # Configuração de rotas da aplicação
│   ├── services/        # Integração com APIs e serviços
│   ├── styles/          # Estilização global
│   ├── App.tsx          # Componente raiz
│   └── main.tsx         # Ponto de entrada
├── Dockerfile           # Configuração de containerização
├── nginx.conf           # Configuração do servidor para produção
└── package.json         # Dependências e scripts
```

## 🛠️ Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- npm ou yarn

### Passos
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd conecthus
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

## 🐳 Como Rodar via Docker

Certifique-se de ter o [Docker](https://www.docker.com/) instalado em sua máquina.

### Usando Docker Compose (Recomendado)
Para subir o container facilmente, utilize:
```bash
docker-compose up -d
```
A aplicação estará rodando em `http://localhost:8080`.

### Usando Docker CLI
Se preferir usar apenas o Docker:

1. Construa a imagem:
   ```bash
   docker build -t conecthus .
   ```

2. Rode o container:
   ```bash
   docker run -p 8080:80 conecthus
   ```

---
Desenvolvido com ❤️ por Guirmes.
