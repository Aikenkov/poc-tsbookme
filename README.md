# poc-tsbookme

Uma POC com o objetivo de me familiarizar com o TypeScript. Booksme é uma API para controlar sua estante de livros e não depender somente da memória quando for indicar um para o amiguinho, por exemplo.

* Rotas verificadas precisam do token no header com o formato Authorization Bearer token 

# Auth routes

* Criar conta
POST /signup body: { 
                      name: string; required,
                      password: string; required,
                      email: string; required; precisa conter @ e .com ou .net
                      }

* Logar                      
POST /signin body: {
                      email: string; required; precisa conter "@" e .com ou .net,
                      password: string; required
                      }
                      
# Categories routes 

* Inserir categoria
POST /category (verificada) body: {
                                     name: string; mínimo 1 caracter; sem espaços em branco; required
                                     }
* Remover categoria                                     
DELETE /category/:id (verificada) id: id da categoria    

* Listar todas categorias
GET /category 

# Categories routes 

* Listar todos os livros
GET /book     

* Favoritar um livro
POST /userbook/:book_id (verificada) book_id: id do livro

* Desfavoritar um livro
DELETE /userbook/:id (verificada) id: id do livro na tabela meio do usuário (user_books)

* Marcar livro como lido
PUT /read/:id (veridicada) id: id do livro na tabela meio do usuário (user_books)

* Desmarcar livro como lido
PUT /unread/:id (veridicada) id: id do livro na tabela meio do usuário (user_books)

* Inserir livro
POST /book (verificada) body: {
                                name: string; required,
                                image: string; required; uri,
                                category_id: number; maior que 0; required
                                }
* Listar livros lidos
GET /user/readed (verificada)

* Listar livros favoritados
GET /user/favorite (verificada)

* Obter quantidade de livros lidos
GET /user/count (verificada)

# Como Testar

* Clone o projeto
* npm i (instalar dependências)
* configure o arquivo .env usando o .env.exemple como referência (roda localmente)
* rodar o dump

