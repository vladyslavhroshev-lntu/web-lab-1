# Практична робота №1: Базовий клієнт – бекенд – БД

## 📌 Тема проєкту: «Онлайн-магазин (SmartStore) — Каталог товарів»

Цей проєкт реалізує трирівневу архітектуру веб-застосунку для демонстрації взаємодії між клієнтською частиною, серверним API та базою даних.

---

## 🏗️ Архітектура системи

```
[ Клієнт (React + Vite) ]  
           │ 
           │ HTTP GET /items (REST API)
           ▼
[ Бекенд (NestJS + TypeScript) ]
           │ 
           │ TypeORM
           ▼
[ База даних (SQLite) ]
           └── Таблиця: items (id, name, description, price)
```

- **Frontend:** React 18, Vite, TypeScript, семантичний HTML5, CSS-змінні.
- **Backend:** Nest.js, TypeScript, REST API, CORS.
- **Database:** SQLite (локальний файл `database.sqlite`), ORM TypeORM з автоматичною міграцією схеми (`synchronize: true`) та авто-сідингом тестових даних при першому запуску.

---

## 📋 Виконані вимоги лабораторної роботи

1. **Тема командного проєкту:** Обрано інтернет-магазин / каталог товарів (*SmartStore*).
2. **Бекенд:** 
   - Піднято сервер на NestJS + TypeScript.
   - Створено endpoint `GET /items`, який повертає список товарів із бази даних.
   - Додатково: `POST /items` для додавання нового товару.
3. **База даних:** 
   - Локальна БД SQLite.
   - Створено сутність та таблицю `items` з полями `id`, `name` (а також додатковими `description`, `price` для теми магазину).
   - При старті автоматично додаються 5 початкових записів, якщо таблиця порожня.
4. **Клієнт:** 
   - React-додаток на базі Vite.
   - Інтерфейс із кнопкою **«Load items»**.
   - Асинхронний виклик `GET http://localhost:3000/items`.
   - Відображення списку елементів із підтримкою станів завантаження (loading) та обробки помилок з'єднання.
   - Додатково: форма для швидкого створення нового товару в базі.

---

## 🚀 Швидкий старт та запуск

### Вимоги:
- **Node.js** (v18+) або **Bun** (v1.0+)
- **npm** або **bun**

### 1. Встановлення залежностей

У кореневій директорії виконайте:
```bash
bun run install:all
# або: npm run install:all
```
*(або окремо `cd backend && bun install`, потім `cd ../frontend && bun install`)*

---

### 2. Запуск бекенду (NestJS + SQLite)

```bash
# З кореневої директорії:
bun run dev:backend
# або: npm run dev:backend

# Або з папки backend:
cd backend
bun run start:dev
```
- Сервер запуститься за адресою: `http://localhost:3000`
- API Endpoint: `http://localhost:3000/items`
- При першому запуску автоматично створиться файл `backend/database.sqlite` та заповняться тестові товари.

---

### 3. Запуск клієнту (React + Vite)

У **новому терміналі**:
```bash
# З кореневої директорії:
bun run dev:frontend
# або: npm run dev:frontend

# Або з папки frontend:
cd frontend
bun run dev
```
- Клієнт відкриється за адресою: `http://localhost:5173`
- Натисніть кнопку **«Load items»** для завантаження товарів із сервера.

---

## 👥 Робота з Git у команді (Вимога №5)

Для виконання практичного завдання в команді використовується модель **Fork & Pull Request**:

### Крок 1. Дії Лідера команди (створення головного репозиторію)
1. Створити новий порожній публічний репозиторій на GitHub / GitLab (наприклад, `web-project-team`).
2. Ініціалізувати та завантажити цей проєкт у головний репозиторій:
   ```bash
   git init
   git add .
   git commit -m "feat: initial project structure with NestJS, SQLite, and React"
   git branch -M main
   git remote add origin https://github.com/<leader-username>/web-project-team.git
   git push -u origin main
   ```

### Крок 2. Дії учасників команди (робота через Fork)
1. Відкрити сторінку репозиторію лідера на GitHub і натиснути кнопку **«Fork»** у правому верхньому кутку.
2. Клонувати **свій fork** на локальний комп'ютер:
   ```bash
   git clone https://github.com/<your-username>/web-project-team.git
   cd web-project-team
   ```
3. Додати посилання на оригінальний репозиторій лідера (upstream):
   ```bash
   git remote add upstream https://github.com/<leader-username>/web-project-team.git
   ```
4. Створити нову гілку для свого завдання:
   ```bash
   git checkout -b feature/item-categories
   ```
5. Внести зміни, закомітити та запушити у **свій fork**:
   ```bash
   git add .
   git commit -m "feat: add category filter for items"
   git push -u origin feature/item-categories
   ```

### Крок 3. Створення Pull Request (PR)
1. Перейти на GitHub у свій fork.
2. Натиснути кнопку **«Compare & pull request»**.
3. Вказати цільову гілку: `base repository: leader/web-project-team` (гілка `main`) ← `head repository: your-username/web-project-team` (ваша гілка `feature/...`).
4. Написати короткий опис змін і натиснути **«Create pull request»**.

### Крок 4. Рев'ю та Merge (Лідер команди)
1. Лідер команди переглядає вкладку **Pull Requests**.
2. Перевіряє код, за потреби залишає коментарі.
3. Натискає **«Merge pull request»** для інтеграції змін у головну кодову базу.
4. Усі учасники оновлюють свій локальний `main`:
   ```bash
   git checkout main
   git pull upstream main
   ```
