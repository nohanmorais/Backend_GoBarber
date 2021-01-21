# Recuperacao de senha

**Requisitos Funcionais**

- O usuario deve poder recuperar sua senha informando seu e-mail;
- O usuario deve receber um email com instrucoes com recuperacao de senha;
- O usuario deve poder resetar sua senha;

**Requisitos Nao Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em producao;
- O envio de email deve acontecer em segundo plano (background job);


**Regras de negocio**

- O link enviado por e-mail para resetar senha deve expirar em duas horas;
- O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualizacao do perfil


**Requisitos Funcionais**

- O usuario deve poder atualizar seu nome, email e senha;

**Requisitos Nao Funcionais**


**Regras de negocio**

- O usuario nao pode alterar seu email para um email ja utilizado por outro usuario;
- Para atualizar sua senha o usuario deve informar a senha antiga;
- Para atualizar sua senha o usuario deve confirmar sua nova senha;

# Painel do Prestador

**Requisitos Funcionais**

- O usuario deve poder listar todos seus agendamentos de um dia especifico;
- O prestador deve receber uma notificacao sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificacoes nao lidas;

**Requisitos Nao Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificacoes do prestador devem ser armazenadas no MongoBD;
- As notificacoes do prestador devem ser enviadas em tempo real utilizando Socket.io;

**Regras de negocio**

- A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar;



# Agendamento de servicos

**Requisitos Funcionais**

- O usuario deve poder listar todos os prestadores de servicos cadastrados;
- O usuario deve poder listar os dias disponiveis de um prestador com pelo menos um horario disponivel;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;

**Requisitos Nao Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de negocio**

- Cada agendamento deve durar uma hora exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h ( primeiro as 8h e ultimo as 17h);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario nao pode agendar em um horario passado;
- O usuario nao pode agendar servicos consigo mesmo;
