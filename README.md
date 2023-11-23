# ft_transcendence

## Setup
Backend: NestJs + TS
DB: Postgres
Frontend: VUE + TS, VITE
Devops: docker + docker compose


## Instando NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, 
and attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## Instalando NodeJS
```bash
nvm install --lts
nodejs -v // verifica se é a versão lts
```

## Instalando CLI
```bash
npm i -g @nestjs/cli
```

## Instalando yarn
```bash
npm i -g yarn
```

## Rodando a Aplicação

### Backend
```bash
yarn start:dev
```
### Frontend
```bash
yarn dev
```