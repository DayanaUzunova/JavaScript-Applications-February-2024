export function showView(sectionId, callback, event, param) {
    event?.preventDefault();

    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    if (typeof callback == 'function') {
        callback(param);
    }
}