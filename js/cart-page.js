(function () {
  const CART_STORAGE_KEY = 'shop-project-cart';

  const listEl  = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const totalEl = document.getElementById('cart-total');

  if (!listEl) return;

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn(e);
    }
  }

  function formatPrice(price) {
    return `${price.toLocaleString('ru-RU')} руб.`;
  }

  function renderCart() {
    const cart = loadCart();
    listEl.textContent = '';

    if (cart.length === 0) {
      emptyEl.hidden = false;
      totalEl.textContent = '0 руб.';
      return;
    }

    emptyEl.hidden = true;

    let total = 0;

    cart.forEach((product, index) => {
      total += product.price;

      const li = document.createElement('li');
      li.classList.add('cart-summary__item');

      const title = document.createElement('span');
      title.classList.add('cart-summary__title');
      title.textContent = product.title;

      const price = document.createElement('span');
      price.classList.add('cart-summary__price');
      price.textContent = formatPrice(product.price);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.classList.add('cart-summary__remove');
      removeBtn.textContent = '×';
      removeBtn.setAttribute('aria-label', `Удалить ${product.title}`);
      removeBtn.addEventListener('click', () => {
        removeFromCart(index);
        renderCart();
      });

      li.append(title, price, removeBtn);
      listEl.append(li);
    });

    totalEl.textContent = formatPrice(total);
  }

  function removeFromCart(index) {
    const cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  renderCart();
})();