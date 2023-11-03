# Modelagem de Dados:

## Identifique os Requisitos:
- [x] Deve ser possível cadastrar um pet
  - [x] Um pet deve estar ligado a uma ORG
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
  - [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
  - [x] Todos os filtros, além da cidade, são opcionais
  - [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
  - [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Deve ser possível realizar login como uma ORG
  - [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Identifique as Entidades:
- [ ] Pet
- [ ] Org

## Defina os Atributos: 
- [ ] Pet                  
  * id
  * especie
  * org
  * name
  * bio
  * dateOfBirth
  * dateOfAdoption
  * energyLevel
  * size
  * independenceLevel
  * requirements
  * photos

- [ ] Org
  * id
  * name
  * nameOfOwner
  * email
  * password
  * cep
  * address
  * coordinate
  * phone

## Estabeleça Relacionamentos:
  Uma organização possui vários pets e um pet possui relação com apenas uma org.

# DDD (Domain-Driven Design)

## Entidades e Agregados
- [x] Pet entidade que representa um animal de estimação
- [ ] Org entindade que representa uma org

## Value Objects:
- [ ] Coordenadas
- [ ] Size
- [ ] Energy
- [ ] Photo

## Repositórios: 
- Repositório de pets
- Repositório de orgs

## Serviços de Domínio
- [ ] cadastrar um pet
- [ ] listar pets por cidade
- [ ] visualizar detalhes de um pet
- [ ] cadastrar como uma ORG
- [ ] login como uma ORG