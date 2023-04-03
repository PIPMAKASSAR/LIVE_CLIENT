export default function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    // if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
    //     return
    // }
    if (/[^0-9\b\t]/.test(keyValue)) {
        event.preventDefault();
    } 
    // if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
    //     return;
    //   }
  
    //   // Check if pasted content contains only numerical values
    //   if (event.clipboardData) {
    //     const pastedData = event.clipboardData.getData('text');
    //     if (/^[0-9]+$/.test(pastedData)) {
    //       return;
    //     }
    //   }
  
      // Prevent default behavior for all other keys
    //   event.preventDefault();

}