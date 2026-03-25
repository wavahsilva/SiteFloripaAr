# 📤 Como Enviar o Site Floripa AR para o GitHub

## Passo 1: Instalar o Git

O Git não está instalado no seu sistema. Siga estas etapas:

### Baixar e Instalar o Git para Windows

1. **Baixe o Git**:
   - Acesse: https://git-scm.com/download/win
   - O download deve iniciar automaticamente
   - Ou clique em "Click here to download manually"

2. **Instale o Git**:
   - Execute o instalador baixado
   - Use as configurações padrão (apenas clique em "Next")
   - **IMPORTANTE**: Marque a opção "Git from the command line and also from 3rd-party software"
   - Finalize a instalação

3. **Reinicie o VS Code** (ou terminal) após a instalação

## Passo 2: Configurar o Git (Primeira Vez)

Após instalar o Git, abra um novo terminal e execute:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

**Substitua** "Seu Nome" e "seu-email@exemplo.com" pelos seus dados.

## Passo 3: Criar Repositório no GitHub

1. Acesse: https://github.com/wavahsilva/SiteFloripaAr
2. Se o repositório já existe, pule para o Passo 4
3. Se não existe:
   - Vá para https://github.com/new
   - Nome do repositório: `SiteFloripaAr`
   - Deixe como **público** ou **privado** (sua escolha)
   - **NÃO** marque "Initialize with README"
   - Clique em "Create repository"

## Passo 4: Enviar o Site para o GitHub

Execute os seguintes comandos **UM POR VEZ** no terminal (dentro da pasta do projeto):

### 4.1 - Inicializar o repositório Git local
```powershell
git init
```

### 4.2 - Adicionar todos os arquivos
```powershell
git add .
```

### 4.3 - Criar o primeiro commit
```powershell
git commit -m "Initial commit: Site Floripa AR completo"
```

### 4.4 - Renomear branch para main
```powershell
git branch -M main
```

### 4.5 - Conectar ao repositório GitHub
```powershell
git remote add origin https://github.com/wavahsilva/SiteFloripaAr.git
```

### 4.6 - Enviar para o GitHub
```powershell
git push -u origin main
```

**Nota**: O GitHub pode pedir suas credenciais. Use seu username e um **Personal Access Token** (não a senha).

## Passo 5: Criar Personal Access Token (se necessário)

Se o GitHub pedir autenticação:

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Nome: "Site Floripa AR"
4. Marque: `repo` (acesso completo aos repositórios)
5. Clique em "Generate token"
6. **COPIE O TOKEN** (você não verá novamente!)
7. Use o token como senha quando o Git pedir

## Comandos Resumidos (Após Git Instalado)

```powershell
cd I:\Projetos\site_floripa_ar
git init
git add .
git commit -m "Initial commit: Site Floripa AR completo"
git branch -M main
git remote add origin https://github.com/wavahsilva/SiteFloripaAr.git
git push -u origin main
```

## Atualizações Futuras

Quando fizer alterações no site:

```powershell
git add .
git commit -m "Descrição da alteração"
git push
```

## Verificar Status

Para ver o status dos arquivos:

```powershell
git status
```

## Problemas Comuns

### "Git não é reconhecido"
- Reinicie o VS Code/terminal após instalar o Git
- Ou reinicie o computador

### "Permission denied"
- Use um Personal Access Token em vez da senha
- Ou configure SSH keys

### "Repository not found"
- Verifique se o repositório existe no GitHub
- Verifique se a URL está correta

---

**Após seguir estes passos, seu site estará no GitHub! 🚀**
