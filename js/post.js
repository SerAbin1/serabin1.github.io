
document.addEventListener("DOMContentLoaded", () => {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach(codeBlock => {
        const codeElement = codeBlock.querySelector("code");
        if (codeElement) {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";

            const copyButton = document.createElement("button");
            copyButton.className = "copy-button";
            copyButton.innerHTML = `<img src="/public/icons/clipboard.svg" alt="Copy to clipboard">`;

            codeBlock.parentNode.insertBefore(wrapper, codeBlock);
            wrapper.appendChild(codeBlock);
            wrapper.appendChild(copyButton);

            copyButton.addEventListener("click", () => {
                const codeToCopy = codeElement.innerText;
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    copyButton.innerHTML = `<img src="/public/icons/check.svg" alt="Copied">`;
                    setTimeout(() => {
                        copyButton.innerHTML = `<img src="/public/icons/clipboard.svg" alt="Copy to clipboard">`;
                    }, 2000);
                });
            });
        }
    });
});
