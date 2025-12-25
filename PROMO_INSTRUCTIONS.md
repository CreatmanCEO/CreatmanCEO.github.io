# Промо-баннер и Pop-up - Инструкция по применению

## Что добавлено:
1. ✅ Промо-баннер вверху страницы (фиксированный)
2. ✅ Pop-up окно с акцией (появляется через 3 секунды)
3. ✅ Телефон в шапке сайта: +7 (906) 005-03-02
4. ✅ Все элементы адаптивны для desktop и mobile

## Файлы в ветке `promo-banner-feature`:
- `js/main.js` - обновлён, добавлены классы PromoBanner и PromoPopup
- `styles/promo.css` - новый файл со стилями промо-элементов
- `templates/promo-elements.html` - шаблон HTML для копирования

## Как применить к основному сайту:

### Шаг 1: Обновить index.html

#### 1.1 Добавьте в `<head>` ссылку на CSS:
```html
<link href="styles/promo.css" rel="stylesheet">
```

#### 1.2 Добавьте промо-элементы сразу после `<body>`:
Скопируйте содержимое из `templates/promo-elements.html`

#### 1.3 Добавьте телефон в шапку:
В секции `<header>`, после `<nav class="nav-links">...</nav>` добавьте:
```html
<a href="tel:+79060050302" class="header-phone">
    <i class="fas fa-phone-alt"></i>
    <span>+7 (906) 005-03-02</span>
</a>
```

### Шаг 2: Тестирование

После merge в main, проверьте:
- [ ] Промо-баннер показывается вверху
- [ ] Pop-up появляется через 3 секунды
- [ ] Баннер закрывается по клику на крестик
- [ ] Pop-up закрывается по Esc, клику вне окна, на крестик
- [ ] Телефон кликабелен на мобильных
- [ ] После закрытия элементы не показываются повторно (localStorage)

### Шаг 3: Сброс для повторного тестирования

Если нужно снова увидеть промо-элементы:
1. Откройте DevTools (F12)
2. Console → введите:
```javascript
localStorage.removeItem('promoBannerClosed');
localStorage.removeItem('promoPopupShown');
location.reload();
```

## Rollback (откат к рабочей версии):

Если что-то не работает:
```bash
git checkout main
```

Рабочая версия сохранена в коммите: `8053544`

## Merge в main:

Когда все протестировано и работает:
```bash
git checkout main
git merge promo-banner-feature
git push origin main
```
