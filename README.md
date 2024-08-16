# estudo_node_3


##Requisitos Funcionais

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academis próximas;
- [ ] Deve ser possível o usuário realizar o check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

##Regras de negócios

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer o check-in see não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por admnistradores;
 
##Requisitos não funcionais
- [ ] A senha deve ser criptografada;
- [ ] O banco de dados deve ser postGreSQL;
- [ ] Todas as listas devem ser páginadas com no máximo 20 itens;
- [ ] A autenticação deve ser feita com JWT token;


tsup usado para criar versão de build