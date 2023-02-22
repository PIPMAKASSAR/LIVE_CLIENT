export default function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);

    if (/[^0-9\b]/.test(keyValue)) {
        event.preventDefault();
    }
}