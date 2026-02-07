// ==UserScript==
// @name         ChatGPT-Enhancer
// @namespace    https://github.com/klondike0x/ChatGPT-Enhancer
// @version      1.5.4
// @description  Убирает лимит сообщение в ChatGPT
// @author       klondike0x
// @match        *://chatgpt.com/*
// @icon         https://raw.githubusercontent.com/klondike0x/ChatGPT-Enhancer/refs/heads/main/canvas.png
// @updateURL    https://raw.githubusercontent.com/klondike0x/ChatGPT-Enhancer/refs/heads/main/ChatGPT-Enhancer.js
// @downloadURL  https://raw.githubusercontent.com/klondike0x/ChatGPT-Enhancer/refs/heads/main/ChatGPT-Enhancer.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Функция для включения кнопки
    function enableButton(button) {
        if (button && button.disabled) {
            button.disabled = false;
            button.removeAttribute('disabled');
        }
    }

    // Функция для удаления div
    function removeDiv() {
        const divToRemove = document.querySelector('div.absolute.start-0.end-0.bottom-full.-z-1');
        if (divToRemove) {
            divToRemove.remove();
        }
    }

    // Функция для имитации Enter
    function setupEnterKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                const submitBtn = document.querySelector('button[aria-label="Отправить подсказку"]');
                if (submitBtn) {
                    e.preventDefault(); // чтобы Enter не добавлял новую строку
                    submitBtn.click(); // имитируем клик по кнопке
                }
            }
        });
    }

    function replaceChatGPTLabels() {
    const TARGET = 'ChatGPT';
    const REPLACEMENT = 'ChatGPT Unlimited';

    // 1. Header (кнопка модели)
    document.querySelectorAll('header button div').forEach(el => {
        if (el.textContent.trim() === TARGET && !el.dataset.unlimited) {
            el.textContent = REPLACEMENT;
            el.dataset.unlimited = 'true';
        }
    });

    // 2. Dropdown (меню моделей)
    document.querySelectorAll('[role="menu"] span, [role="menu"] div').forEach(el => {
        if (el.textContent.trim() === TARGET && !el.dataset.unlimited) {
            el.textContent = REPLACEMENT;
            el.dataset.unlimited = 'true';
        }
    });
}

    // Наблюдатель за DOM
    const observer = new MutationObserver(() => {
        // Активируем кнопку
        const submitBtn = document.querySelector('button[aria-label="Отправить подсказку"]');
        enableButton(submitBtn);

        // Удаляем div
        removeDiv();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Попытка сразу при загрузке
    enableButton(document.querySelector('button[aria-label="Отправить подсказку"]'));
    removeDiv();
    setupEnterKey();
})();
