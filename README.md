# React posts

В качестве API используется сервис [JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

Проект доступен по [ссылке](https://mickkrishtopa.github.io/react-posts-ts/)

## Функциональность

-   Вывод постов происходит постранично с возможность изменить количевство выводимых постов. При перезагрузке страницы изменения сохраняются.
-   Каждый пост состоит из названия, имени пользователя, его добавившего, основного текста, кнопок «Комментарии», «Редактировать», «Удалить» и «В избранное».

-   Кнопки в посте:
    -   "Комментарии": имеет два состояния и позволяет увидеть блок с комментариями.
    -   «Редактировать»: при нажатии открывает возможность изменить текст поста, его название и пользователя, от чьего имени опубликован пост. В режиме редактирования пользователь может сохранить или же отменить внесённые изменения.
    -   «Удалить»: открывает всплывающее окно с подтверждением удаления. При утвердительном ответе пост убирается со страницы, при отрицательном ничего не происходит.
    -   "В Избранное": добавлят пост в коллекцию пользователя и визуально изменяет кнопку. Если нажать на кнопку повторно – пост удаляется из избранных.
-   Есть возможность добавить новый пост. При создании происходит базовая валидация формы на наличие данных.

## Технологический стек

-   TypeScript
-   React
-   Redux toolkit
-   RTK Query
-   Sass
-   REST API
