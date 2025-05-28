# Short Link - Frontend Next.js

Encurtador de URLs profissional com análise de dados, migrado de HTML simples para Next.js com TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Icons** - Biblioteca de ícones
- **Chart.js + react-chartjs-2** - Biblioteca para gráficos
- **ESLint** - Linter para qualidade de código

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais com Tailwind
│   ├── layout.tsx         # Layout raiz da aplicação
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── Charts.tsx         # Componentes de gráficos
│   ├── Reports.tsx        # Componente de relatórios
│   ├── ShortenForm.tsx    # Formulário para encurtar URLs
│   ├── Tabs.tsx           # Navegação por abas
│   └── UrlsList.tsx       # Lista de URLs criadas
├── hooks/                 # Hooks personalizados
│   ├── useReports.ts      # Hook para dados de relatórios
│   └── useUrls.ts         # Hook para gerenciar URLs
├── types/                 # Definições TypeScript
│   └── index.ts           # Tipos da aplicação
└── utils/                 # Utilitários
    ├── api.ts             # Configuração da API
    └── helpers.ts         # Funções auxiliares
```

## 🎯 Funcionalidades

### 1. Encurtamento de URLs

- ✅ Formulário responsivo para encurtar URLs
- ✅ Validação de entrada
- ✅ Feedback visual de loading
- ✅ Cópia da URL encurtada para clipboard
- ✅ Exibição da data de expiração

### 2. Listagem de URLs

- ✅ Tabela responsiva com todas as URLs
- ✅ Informações de acessos, datas de criação e expiração
- ✅ Botão para copiar URL encurtada
- ✅ Botão para testar URL (abre em nova aba)
- ✅ Atualização automática e manual

### 3. Relatórios e Analytics

- ✅ Cards com estatísticas gerais
- ✅ Gráfico de linha com acessos por dia
- ✅ Gráfico de barras com URLs mais acessadas
- ✅ Indicador do dia de pico de acessos

## 🛠️ Melhorias Implementadas na Migração

### Arquitetura

- **Separação de responsabilidades**: Componentes específicos para cada funcionalidade
- **Hooks personalizados**: Lógica de estado centralizada e reutilizável
- **TypeScript**: Tipagem completa para maior segurança e produtividade
- **API centralizada**: Cliente HTTP organizado com tratamento de erros

### UI/UX

- **Design responsivo**: Interface adaptável para desktop e mobile
- **Estados de loading**: Feedback visual durante operações
- **Tratamento de erros**: Mensagens claras para o usuário
- **Acessibilidade**: Componentes semânticos e navegação por teclado

### Performance

- **Code splitting**: Carregamento otimizado com Next.js
- **Memoização**: Hooks otimizados para evitar re-renders desnecessários
- **Lazy loading**: Componentes carregados sob demanda

## 🚀 Como executar

1. **Instalar dependências**:

```bash
npm install
```

2. **Executar em desenvolvimento**:

```bash
npm run dev
```

3. **Build para produção**:

```bash
npm run build
npm start
```

## 📊 API Endpoints

A aplicação consome os seguintes endpoints:

- `GET /url` - Lista todas as URLs
- `POST /url` - Cria uma nova URL encurtada
- `GET /reports/stats` - Estatísticas e dados para gráficos
- `GET /reports/peak-access` - Dia de pico de acessos

## 🧪 Estrutura de Dados

### URL

```typescript
interface Url {
  id: number;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  expiresAt: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### Response de URLs

```typescript
interface UrlResponse {
  data: Url[];
  meta: {
    totalItems: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    totalPages: number;
  };
}
```

## 📝 Boas Práticas Implementadas

1. **Componentização**: Cada funcionalidade é um componente isolado
2. **Custom Hooks**: Lógica de estado reutilizável
3. **TypeScript**: Tipagem completa para maior segurança
4. **Error Boundaries**: Tratamento de erros robusto
5. **Responsive Design**: Layout adaptável
6. **Acessibilidade**: Componentes semânticos
7. **Performance**: Otimizações do Next.js
8. **Code Quality**: ESLint configurado

## 🎨 Design System

A aplicação utiliza um design system baseado em Tailwind CSS com:

- **Cores primárias**: Gradiente índigo/roxo
- **Tipografia**: Sans-serif responsiva
- **Componentes**: Cards, botões, formulários padronizados
- **Estados**: Loading, error, success claramente diferenciados
- **Responsividade**: Mobile-first approach

## 📈 Próximos Passos

- [ ] Implementar autenticação (se necessário)
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar modo escuro
- [ ] Implementar filtros na listagem
- [ ] Adicionar mais tipos de gráficos

## 🚀 Deploy

### Vercel (Frontend)

1. Conecte sua conta GitHub ao Vercel
2. Importe este repositório
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: URL da sua API (ex: https://your-api.railway.app/api)
4. Deploy automático a cada push na branch main

### Configuração Rápida

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BOThiago/short-link-ui)

### Variáveis de Ambiente

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.railway.app/api
```

## 🚀 Deploy

### Vercel (Frontend)

1. Conecte sua conta GitHub ao Vercel
2. Importe este repositório
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: URL da sua API (ex: https://your-api.railway.app/api)
4. Deploy automático a cada push na branch main

### Configuração Rápida

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BOThiago/short-link-ui)

### Variáveis de Ambiente

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.railway.app/api
```
