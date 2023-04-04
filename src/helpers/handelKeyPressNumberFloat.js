export default function handleKeyPressNumberFloat(event) {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);

    if (/[^0-9.\b\t]/.test(keyValue)) {
        event.preventDefault();
    } 
}