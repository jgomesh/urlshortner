# Nome do Projeto

<img src="imagem.png" alt="Exemplo imagem">

> Linha adicional de texto informativo sobre o que o projeto faz. Sua introdução deve ter cerca de 2 ou 3 linhas. Não exagere, as pessoas não vão ler.

### Possíveis melhorias

- [ ] Implementar caching para respostas que não mudam frequentemente
- [ ] Suporte para paginação em endpoints que retornam listas grandes para evitar problemas de desempenho e sobrecarga de dados.
- [ ] HTTPS em vez de HTTP

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou o Docker e o Docker Compose. Consulte a seção abaixo para obter instruções sobre como instalar.
- Você tem o Visual Studio Code (VS Code) instalado. Siga as instruções na seção abaixo para instalação.
- Você tem uma máquina `<Windows / Linux / Mac>`. O projeto é compatível com os três sistemas operacionais.
- Você leu a [documentação do Docker](https://docs.docker.com/get-docker/) e a [documentação do VS Code](https://code.visualstudio.com/docs/setup/setup-overview) se necessário.

## 🚀 Instalando <Nome_Do_Projeto>

Siga estas etapas para instalar e rodar o projeto:

### 1. Instalando Docker

#### **Linux e macOS:**

1. **Instalar Docker:**
   - Abra o terminal e execute:
     ```bash
     sudo apt-get update
     sudo apt-get install docker-ce docker-ce-cli containerd.io
     ```
   - Para macOS, você pode usar o [Docker Desktop para Mac](https://docs.docker.com/desktop/install/mac-install/).

2. **Instalar Docker Compose:**
   - Execute:
     ```bash
     sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
     sudo chmod +x /usr/local/bin/docker-compose
     ```

#### **Windows:**

1. **Instalar Docker Desktop:**
   - Baixe o [Docker Desktop para Windows](https://docs.docker.com/desktop/install/windows-install/) e siga as instruções de instalação.

2. **Instalar Docker Compose:**
   - O Docker Desktop inclui o Docker Compose, então você não precisa instalá-lo separadamente.

### 2. Instalando Visual Studio Code (VS Code)

#### **Linux e macOS:**

1. **Baixar e instalar:**
   - Visite [Visual Studio Code](https://code.visualstudio.com/) e siga as instruções para instalar o VS Code para o seu sistema operacional.

#### **Windows:**

1. **Baixar e instalar:**
   - Baixe o [Visual Studio Code para Windows](https://code.visualstudio.com/Download) e siga as instruções de instalação.

## ☕ Usando Encurtador de URL

Para usar o Encurtador de URL, siga estas etapas:

1. **Crie uma URL encurtada:**
   - Envie um POST para `/create` com o JSON `{ "original_url": "http://exemplo.com" }`. Exemplo de como fazer isso com `curl`:
     ```bash
     curl -X POST http://localhost:3001/create -H "Content-Type: application/json" -d '{"original_url": "http://exemplo.com"}'
     ```
   - A resposta incluirá um código curto que pode ser usado para acessar a URL encurtada.

2. **Redirecionar URL encurtada:**
   - Acesse a URL encurtada no formato `/shortCode` para redirecionar para o URL original. Exemplo:
     ```
     http://localhost:3001/shortCode
     ```

3. **Listar URLs encurtadas:**
   - Envie um GET para `/urls` para listar todas as URLs encurtadas e seus códigos. Exemplo de como fazer isso com `curl`:
     ```bash
     curl -X GET http://localhost:3001/urls
     ```

4. **Excluir uma URL encurtada:**
   - Envie um DELETE para `/delete/:shortCode` para excluir a URL encurtada associada ao `shortCode`. Exemplo de como fazer isso com `curl`:
     ```bash
     curl -X DELETE http://localhost:3001/delete/shortCode
     ```

5. **Contabilizar acessos:**
   - As estatísticas de acessos podem ser visualizadas enviando um GET para `/stats/:shortCode`. Exemplo de como fazer isso com `curl`:
     ```bash
     curl -X GET http://localhost:3001/stats/shortCode
     ```

6. **Autenticação de usuários (se aplicável):**
   - **Criar um usuário:**
     Envie um POST para `/users` com o JSON `{ "username": "user", "password": "pass" }`.
     ```bash
     curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"username": "user", "password": "pass"}'
     ```
   - **Login de usuário:**
     Envie um POST para `/login` com o JSON `{ "username": "user", "password": "pass" }`.
     ```bash
     curl -X POST http://localhost:3001/login -H "Content-Type: application/json" -d '{"username": "user", "password": "pass"}'
     ```
   - **Autenticar operações:**
     Utilize o token obtido do login para autenticar operações como criar, listar, ou excluir URLs.

## 🔧 Configuração de Logs

Para configurar o gerenciamento de logs com o New Relic:

1. **Definir variáveis de ambiente:**
   - Defina as variáveis de ambiente para o New Relic no seu arquivo de configuração ou diretamente no ambiente de execução. As variáveis incluem:
     ```bash
     export NEW_RELIC_LICENSE_KEY="sua-chave-de-licenca"
     export NEW_RELIC_APP_NAME="Nome_Do_Projeto"
     ```

2. **Ativar logs:**
   - Certifique-se de que o New Relic está configurado para capturar e relatar logs. Isso pode incluir a configuração de uma fonte de logs ou a modificação do arquivo de configuração para incluir:
     ```json
     {
       "logging": {
         "level": "info",
         "filepath": "path/to/logfile.log"
       }
     }
     ```

## 🔍 Monitoramento e Performance

Para monitorar a performance e o uso de recursos:

1. **Acesse o New Relic:**
   - Vá para o [New Relic](https://rpm.newrelic.com/) e faça login com suas credenciais.

2. **Visualize dados:**
   - Navegue até o painel do seu aplicativo para visualizar métricas de desempenho, uso de CPU e memória, e logs.

3. **Configurar alertas:**
   - Configure alertas para monitorar a saúde do aplicativo e receber notificações sobre problemas de desempenho.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📫 Contato

Se você tiver dúvidas ou sugestões, entre em contato com [seu-email@dominio.com](mailto:seu-email@dominio.com).
