# Panel admnistracyjny aplikacji FitExpress

To repozytorium git zawiera pliki źródłowe panelu administracyjnego aplikacji FitExpress.
Panel administracyjny pozwala pracownikom FitExpress w szybki sposób dodawać, podglądać, edytować, i usuwać występujące dane w bazie danych.
## Funkcjonalności
- Logowanie użytkowników, którzy są pracownikami FitExpress
- Szybki przegląd danych z bazy
- System paginacji w przypadków dużych porcji danych
- Szczegółowy podgląd bardziej złożonych encji
- Dodawanie, edycja oraz usuwanie danych


## Instalacja lokalna
**UWAGA! Do działania aplikacji lokalnie w pełni możliwości, serwer aplikacji FitExpress musi być włączony!**
### Wymagania
Do zainstalowania wymagane są następujące narzędzia:
- `Node.js v. >= 16.16.0` 
- `Node package manager dołączany razem z node.js`
- `git`

### Instalacja
1. Sklonuj repozytorium
```shell
git clone https://github.com/SquirrelloDev/FitExpress-admin.git
```
2. Zainstaluj wszystkie pakiety
```shell
npm install
```
3. Uruchom aplikację 
```shell
npm run dev
```
### Autorzy
- Emil Olejnik
