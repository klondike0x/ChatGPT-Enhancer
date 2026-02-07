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

    // Наблюдатель за DOM
    const observer = new MutationObserver(() => {
        // Активируем кнопку
        const submitBtn = document.querySelector('button[aria-label="Отправить подсказку"]');
        enableButton(submitBtn);

        // Удаляем div
        removeDiv();
    });

    // --- ADD "ChatGPT Unlimited" LABEL --- //
    const labelObserver = new MutationObserver(() => {
        const divs = document.querySelectorAll('div');
        for (const div of divs) {
            if (div.textContent.trim() === 'ChatGPT' && !div.dataset.unlimitedAdded) {
                div.dataset.unlimitedAdded = 'true';

                const label = document.createElement('div');
                label.textContent = 'ChatGPT Unlimited';
                label.style.fontSize = '11px';
                label.style.fontWeight = '600';
                label.style.color = '#22c55e';
                label.style.marginTop = '3px';
                label.style.userSelect = 'none';

                div.appendChild(label);
            }
        }
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
