function download(content, fileName, contentType) 
{
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.setTimeout(function() {
      URL.revokeObjectURL(file);
      document.body.removeChild(a);
    }, 0);    
}

function saveTemplate()
{
    var cardHeaderUX = document.getElementsByClassName('card-header');

    var stringSelectOptions = "";

    for(var i=0; i< cardHeaderUX.length; i++)
    {
        var selectOption = "<option value='"+ cardHeaderUX[i].parentNode.id +"'>"+ cardHeaderUX[i].childNodes[0].textContent +"</option>";
        stringSelectOptions += selectOption;
    }

    bootbox.confirm({
        message: "<form class='form'>\
                    <div class='form-group'>\
                        <label>Podaj nazwę nowego pliku: </label>\
                        <input type='text' class='form-control' id='nameSavingTemplate'></input>\
                    </div>\
                    <div class='form-group'>\
                        <label>Wybierz dokument do zapisu w postaci szablonu:</label>\
                        <select class='form-control' id='titleSavingTemplate'>" + stringSelectOptions + "</select>\
                    </div>\
                </form>",
        buttons: {
            confirm: {
                label: 'Ok',
                className: 'btn-success'
            },
            cancel: {
                label: 'Anuluj',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result===true)
            {
                var nameDocument = document.getElementById('nameSavingTemplate').value;
                if(nameDocument === "") 
                {
                    $.confirm({
                        title: 'Błędna nazwa!',
                        content: 'Musisz podać nazwę nowego dokumentu',
                        type: 'red',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Ok: {
                                text: 'Ok'
                            }
                        }
                    });           
                }else if(nameDocument) 
                {
                    var patt = new RegExp(/^[\w\s\\u0000-~\u0080-þĀ-žƀ-ɎḀ-ỾⱠ-\u2c7e꜠-ꟾ]+$/);
                    var res = patt.test(nameDocument);

                    if(!res){
                        $.confirm({
                            title: 'Błędna nazwa!',
                            content: 'Nazwa dokumentu może składać się jedynie z liter, liczb oraz spacji!',
                            type: 'red',
                            backgroundDismiss: true,
                            typeAnimated: true,
                            closeIcon: true,
                            buttons: {
                                Ok: {
                                    text: 'Ok'
                                }
                            }
                        });                          
                    }else
                    {
                        var idContainer = document.getElementById("titleSavingTemplate").value;
                        var doc = findDocument(idContainer);

                        var tabPoints = [];
                        
                        for(var i=0; i<doc.punkty.length;i++)
                        {
                            var dataTabulator = doc.punkty[i].lista.getData();

                            dataTabulator.forEach(function (podpunkt) 
                            {
                                delete podpunkt['ocena'];
                            });

                            var point = new PunktJSON(doc.punkty[i].nazwaPunktu, dataTabulator);

                            tabPoints.push(point);
                        }
                        var template = new DaneJSON(true, nameDocument, tabPoints);

                        download(JSON.stringify(template), nameDocument + '.json', 'json');
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });   
}

function saveDocument()
{
    var cardHeaderUX = document.getElementsByClassName('card-header');

    var stringSelectOptions = "";

    for(var i=0; i< cardHeaderUX.length; i++)
    {
        var selectOption = "<option value='"+ cardHeaderUX[i].parentNode.id +"'>"+ cardHeaderUX[i].childNodes[0].textContent +"</option>";
        stringSelectOptions += selectOption;
    }

    bootbox.confirm({
        message: "<form class='form'>\
                    <div class='form-group'>\
                        <label>Podaj nazwę nowego pliku: </label>\
                        <input type='text' class='form-control' id='nameSavingDocument'></input>\
                    </div>\
                    <div class='form-group'>\
                        <label>Wybierz dokument do zapisu:</label>\
                        <select class='form-control' id='titleSavingDocument'>" + stringSelectOptions + "</select>\
                    </div>\
                </form>",
        buttons: {
            confirm: {
                label: 'Ok',
                className: 'btn-success'
            },
            cancel: {
                label: 'Anuluj',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result===true)
            {
                var nameDocument = document.getElementById('nameSavingDocument').value;

                if(nameDocument === "") 
                {
                    $.confirm({
                        title: 'Błędna nazwa!',
                        content: 'Musisz podać nazwę nowego dokumentu',
                        type: 'red',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Ok: {
                                text: 'Ok'
                            }
                        }
                    });           
                }else if(nameDocument) 
                {
                    var patt = new RegExp(/^[\w\s\\u0000-~\u0080-þĀ-žƀ-ɎḀ-ỾⱠ-\u2c7e꜠-ꟾ]+$/);
                    var res = patt.test(nameDocument);

                    if(!res){
                        $.confirm({
                            title: 'Błędna nazwa!',
                            content: 'Nazwa dokumentu może składać się jedynie z liter, liczb oraz spacji!',
                            type: 'red',
                            backgroundDismiss: true,
                            typeAnimated: true,
                            closeIcon: true,
                            buttons: {
                                Ok: {
                                    text: 'Ok'
                                }
                            }
                        });                          
                    }else
                    {
                        var idContainer = document.getElementById("titleSavingDocument").value;
                        var doc = findDocument(idContainer);

                        var tabPoints = [];
                        
                        for(var i=0; i<doc.punkty.length;i++)
                        {
                            var dataTabulator = doc.punkty[i].lista.getData();

                            var notepad = doc.punkty[i].notatki.getContents();

                            var justHtml = doc.punkty[i].notatki.root.innerHTML;

                            var point = new PunktDokumentuJSON(doc.punkty[i].nazwaPunktu, notepad, dataTabulator);

                            tabPoints.push(point);
                        }

                        var template = new DaneJSON(false, nameDocument, tabPoints);

                        download(JSON.stringify(template), nameDocument + '.json', 'json');
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });   
}

function saveNotepad()
{
    var tabNotepads = document.getElementsByClassName('gl_text');

    var stringSelectOptions = "";

    for(var i=0; i< tabNotepads.length; i++)
    {
        var selectOption = "<option value='"+ tabNotepads[i].querySelector(".ql-container").id +"'>"+ 'Notatnik ' + (parseInt(tabNotepads[i].querySelector(".ql-container").id.slice(13))+1); +"</option>";
        stringSelectOptions += selectOption;
    }

    bootbox.confirm({
        message: "<form class='form'>\
                    <div class='form-group'>\
                        <label>Podaj nazwę nowego pliku: </label>\
                        <input type='text' class='form-control' id='nameSavingNotepad'></input>\
                    </div>\
                    <div class='form-group'>\
                        <label>Wybierz notatnik do zapisu:</label>\
                        <select class='form-control' id='titleSavingNotepad'>" + stringSelectOptions + "</select>\
                    </div>\
                </form>",
        buttons: {
            confirm: {
                label: 'Ok',
                className: 'btn-success'
            },
            cancel: {
                label: 'Anuluj',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result===true)
            {
                var nameNotepad = document.getElementById('nameSavingNotepad').value;

                if(nameNotepad === "") 
                {
                    $.confirm({
                        title: 'Błędna nazwa!',
                        content: 'Musisz podać nazwę pliku',
                        type: 'red',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Ok: {
                                text: 'Ok'
                            }
                        }
                    });           
                }else if(nameNotepad) 
                {
                    var patt = new RegExp(/^[\w\s\\u0000-~\u0080-þĀ-žƀ-ɎḀ-ỾⱠ-\u2c7e꜠-ꟾ]+$/);
                    var res = patt.test(nameNotepad);

                    if(!res){
                        $.confirm({
                            title: 'Błędna nazwa!',
                            content: 'Nazwa pliku może składać się jedynie z liter, liczb oraz spacji!',
                            type: 'red',
                            backgroundDismiss: true,
                            typeAnimated: true,
                            closeIcon: true,
                            buttons: {
                                Ok: {
                                    text: 'Ok'
                                }
                            }
                        });                          
                    }else
                    {
                        var idNotepad = document.getElementById("titleSavingNotepad").value;
                        var not = findNotepad(idNotepad).notatnik;

                        var delta = not.getContents();

                        download(JSON.stringify(delta), nameNotepad + '.json', 'json');
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });    
}