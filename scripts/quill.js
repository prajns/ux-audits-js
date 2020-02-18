function initializeQuill(idNotepad)
{
    var notepad  = new Quill('#'+ idNotepad, {
        modules: {
            toolbar: '#'+ idNotepad + '_toolbar',
            history: {
                delay: 2000,
                maxStack: 500,
                userOnly: true
            },
            imageDrop: true,
        },
        placeholder: 'Wprowadź tekst...',
        theme: 'snow'
    });
    
    $('[data-toggle="tooltip"]').tooltip();

    return notepad;
}