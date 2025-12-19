
# SuperTx-Frontend

Projeto frontend da terceira sprint do curso de pós graduação de Engenharia de Sofware da PUC Rio

---
## Como executar em modo de desenvolvimento

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar através do Docker

### Executando apenas o container do frontend

Esta opção executa **somente o frontend** isoladamente. Você precisará ter o backend rodando separadamente (localmente ou em outro container) para que a aplicação funcione completamente.

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t supertx-front .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 supertx-front
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.


## Como executar com Docker Compose

### Executando frontend e backend juntos (Recomendado)

Esta opção executa **toda a aplicação** (frontend + backend) de forma integrada em um único comando.

#### Pré-requisitos

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados e em execução em sua máquina.

#### Estrutura de pastas necessária

Ambos os repositórios (frontend e backend) devem estar clonados na mesma pasta pai. A estrutura deve ser:

```
SuperTx-v2/
├── SuperTx-Frontend-v2/    (este repositório)
│   ├── compose.yaml
│   ├── Dockerfile
│   ├── index.html
│   ├── scripts.js
│   ├── styles.css
│   └── secrets/
│       └── routing_api_key.txt
└── SuperTx-Backend-v2/      (repositório do backend)
    ├── Dockerfile
    └── app.py
    └── ...
```

#### Executando

Navegue até o diretório `SuperTx-Frontend-v2` (que contém o arquivo compose.yaml) no terminal e execute **como administrador** o seguinte comando para construir e iniciar os serviços:

```
$ docker compose up -d
```

Este comando irá:
- Construir as imagens do frontend e backend
- Iniciar ambos os containers
- O backend estará disponível na porta 5000
- O frontend estará disponível na porta 8080
- Configurar a comunicação entre os serviços automaticamente

Para acessar a aplicação, abra o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

Para parar os serviços:

```
$ docker compose down
```