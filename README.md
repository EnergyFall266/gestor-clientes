# ProjetoPadrao

ProjetoPadrao é um projeto com configurações e componentes já prontos para utilização para a criação de um formulário externo. O objetivo é automatizar e acelerar o processo com processos padronizados já realizados, como por exemplo a integração com a plataforma já configurada, componentes de uso comum já estilizados e prontos para uso, etc...

# Modo de uso

Realize um git clone do projeto, troque o nome e o title no app.component.

# Troca de nome

Clique no search(Lupa) do vsCode e procure pela palavra "gestor-clientes" e em replace digite o nome do seu projeto, clique no icone "replace all" e confirme. Por fim altere o titulo ProjetoPadrao no index.html.

## Dark Mode

O darkmode já está configurado no projeto em forma de um checkbox no inicio do html. Caso seja de seu interesse, pode modificar a lógica para um botão, switch, etc..., também temos o lara light e lara dark como temas, caso deseje trocar os temas, visite: https://www.primefaces.org/primeng/setup , clique em Themes escolha o seu tema, troque o caminho do input e o bundle name no angular.json, troque o href para qual será o tema inicial no index.html e no app.component.ts na classe changeTheme troque os bundles.

Para remover o darkmode,
.Remova o app.component.html :

```html
<div class="field-checkbox">
  <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary" (onChange)="changeTheme(checked)"></p-checkbox>
  <label for="binary"> Dark Mode</label>
</div>
```

.No angular.json, remova:

```json
{
    "input": "./node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "bundleName": "lara-light",
    "inject": false
},
{
    "input": "./node_modules/primeng/resources/themes/lara-dark-blue/theme.css",
    "bundleName": "lara-dark",
    "inject": false
}
```

.No index.html, remova:

```html
<link id="app-theme" rel="stylesheet" type="text/css" href="lara-light.css" />
```

.No app.component.ts remova o theme.service injetado no constructor, e remova:

```ts
changeTheme(checked: boolean) {
    if (checked) {
      this.themeService.switchTheme('lara-dark');
    } else {
      this.themeService.switchTheme('lara-light');
    }
  }
```

.Por fim, delete o arquivo theme.service.ts

## beans

No beans ficarão as classes e interfaces utilizadas no projeto.

### VP_BPM.ts

Aqui teremos o classe VP_BPM que irá conter todas as variáveis de processo, algumas váriaveis padrões já estão criadas.

### Workflow.ts

Workflow.ts contém as interfaces utilizadas na integração com a plataforma senior.

### General_Beans.ts

General_Beans.ts é aonde será colocado todas as classes e interfaces gerais, o header padrão já está criado e configurado.

## environments

O environments.ts já está configurado, porém lembre-se de modificar as etapas já criadas("s1_etapa1","s2_etapa2"), essas etapas estão presentes para fins de teste na plataforma.

## functions

No functions ficarão as funções utilizadas no projeto.

### Form_Design.ts

Aqui estão as funções para a utilização de Tabs no seu projeto, caso não deseje usar Tabs remova essa pasta. Para a edição insira o numero de labels desejado e troque os labels.

### Form_Presentation.ts

Contém a função getFormPresentation que é chamada no Load, ou seja, toda vez que uma nova etapa iniciar o conteúdo da função será executado. Dentro do switch configure a visualização e leitura de componentes em cada etapa.

### Form_Validate.ts

Contém a função FormValidate que é chamada no Save, ou seja, toda vez que uma etapa for finalizada o conteúdo da função será executado. Dentro do switch configure a validação de cada componente em cada etapa.

### Get_VP_BPM.ts

Contém a função getVP que é chamada no Load a partir da segunda etapa, ou seja, toda vez que uma etapa iniciar o conteúdo da função será executada com exceção da primeira etapa. Aqui é a conexão com as váriaveis de processo armazenadas na plataforma, passe a variável a receber o valor e dentro do map.get insira o nome como está no processo na plataforma.

### Workflow_Cockpit.ts

Contém as três funções de integração a plataforma da senior loadData, saveData e rollback.
documentação : https://documentacao.senior.com.br/bpm/7.0.0/configuracoes/formularios-web.htm

#### loadData

O loadData é chamado quando uma etapa é iniciada, então tudo colocado aqui será executado ao iniciar uma etapa.

#### saveData

O saveData é chamado toda vez que uma etapa é finalizada, então tudo colocado aqui será executado ao finalizar uma etapa.

#### rollback

Função que é executada se em qualquer momento do processamento do formulário ocorrer algum erro para comunicar ao usuário.

### Anexo_Load.ts

Contém a função anexoLoad que é chamada no Load, ou seja, toda vez que uma etapa iniciar o conteúdo da função será executada. Dentro do switch configure a visualização da pasta para download em cada etapa.

## exemplos

Aqui estão os componentes já prontos e configurados para uso.

### exemplos.component.html/ts

Os exemplos são feitos em forma de Tabs, caso deseje utilizar Tabs em seu projeto transfira o código para o app.component.

### t1-exemplos

O t1-exemplos é feito com colunas, dentro dele temos os componentes t1-c1, t1-c2 e t1-c3, com t representando a Tab e c representando a coluna, os componentes são idênticos e existem afim de demostração do modo de colunas.

#### inputText

O inputText é um componente simples de texto. Lembre-se de adicionar o ngModel ao adiciona-lo ao seu projeto.

#### calendar

O calendar é um componente de data(dia, mês e ano). Lembre-se de adicionar o ngModel ao adiciona-lo ao seu projeto.

#### dropdown

Como o nome mesmo diz é um componente de dropdown. Lembre-se de adicionar o ngModel e substituir o options ao adiciona-lo ao seu projeto.

#### inputMask

O inputMask é o componente usado para fazer mascaras. Lembre-se de adicionar o ngModel, trocar a mask e o placeholder ao adiciona-lo ao seu projeto.

#### inputNumber currency

O inputNumber currency é o componente usado na utilização de valores. Lembre-se de adicionar o ngModel ao adiciona-lo ao seu projeto, caso deseje usar outra moeda que não seja o BRL altere o currency para a moeda desejada.

### t2-exemplos

O t2-exemplos é a Tab onde temos os componentes de anexos e paginação. Os componentes de anexos estão diretamente relacionados a plataforma, então para a utilização dos componentes de anexo é necessário criar as váriaveis de processo:

```ts
  public anexo_files: File[] = [];
  public anexo_ged: Anexo[] = [];
  public anexo_id: string = '';
  public anexo_nome: string = 'nome';
```

Claro, crie com um nome que faça mais sentido, os nomes das variáveis acima são só um exemplo do tipo que devem ser criadas. Em seguida, substitua suas variáveis tanto no html quanto no ts.

#### paginação

Para usar a paginação monte o body da requisição na função inputLazyLoad que fara a ordenação e a filtragem e monte a interface da sua response no WS_Beans.ts, como exemplo temos a interface Servico.

#### html

No html fique atento a referência(#anexosUploader), ela que é o argumento passado nas funções para reconhecer em qual componente a mesma deve ser executada.

#### typescript

No typescript teremos todas as funções para a manipulação dos anexos, essas funções acessam a biblioteca prisma_prismafunctions que contém as funções assyncronas que realizam as requisições ao GED.

#### Básico

O componente de anexo básico é o mais simples, é apenas um botão simples que no primeiro clique você escolhe o arquivo e no segundo clique você faz o upload.

#### Upload automático

O componente de anexo Upload autómatico é similar ao componente de anexo básico, porém realiza a seleção e o upload do arquivo com apenas um clique.

#### Avançado

Possui três botões, um para selecionar o arquivo, um para upload e um para cancelamento. Possui um template que quando selecionado o arquivo fica como pendente, caso seja um arquivo que já esteja no GED ele fica com o status enviado.

### t3-exemplos

O t3-exemplos é feito com painéis, dentro dele temos os componentes t3-painel1, t3-painel2 e t3-painel3, com t representando a Tab e painel será o nome do painél, os componentes são idênticos e existem afim de demostração do modo de painéis.

#### Pop-up(ModalLista)

O Pop-up(ModalLista) é um componente que ao clique abre em forma de modal uma lista. Lembre-se de adicionar o ngModel ao adiciona-lo ao seu projeto.

#### checkbox

O checkbox é o componente que cria uma caixa checkbox. Lembre-se de adicionar o ngModel.

#### email

O email é um inputText comum, porém com uma função checkEmail para a validação. A função valida se o texto digitado contém somente um @, se sim, ele intenderá como um email válido, se não, um email inválido.

#### ngFor

O ngFor é um exemplo para quando se quer uma repetição de componentes a escolha do usuário, consiste em um botão que ao clique abre um componente. Para utiliza-lo, apague os componentes de exemplo de dentro e insira a sua lógica a sua vontade.

#### inputSwitch

O inputSwitch é um componente que é um switch de ativado ou desativado. Lembre-se de trocar o ngModel ao adiciona-lo ao seu projeto.

#### RadioButton

O RadioButton é um componente que é usado para selecionar uma dentre as opções fornecidas. Lembre-se de trocar o ngModel e adicionar ou remover os RadioButtons conforme a quantidade a ser mostrada em ser projeto.

# Finalizando o projeto

Ao final do projeto, lembre-se de excluir a pasta exemplos e remover todos os componentes que não estão sendo utilizados do app.module.ts.

Renomeie a pasta, mude o nome do projeto no package.json e no angular.json mude o caminho:

```json
"build": {
            "outputPath": "dist/gestor-clientes",
}
```

Para o nome do seu projeto. Obs Não esqueça de colocar a barra ("/") no final, exemplo "dist/projeto/".

# Uma Observação muito importante!!!

LEMBRE-SE DE TROCAR O DIRETÓRIO DO PROJETO PARA FAZER OS COMMITS E PUSHS.
