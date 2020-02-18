var objectTemplate = {};

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event)
{
    try 
    {
        objectTemplate = JSON.parse(event.target.result);
    }
    catch(error) 
    {
        $.confirm({
            title: 'Wystąpił błąd pliku!',
            content: "Wybrany plik jest uszkodzony bądź posiada niewłaciwą strukturę.<br><button class='btn btn-warning' type='button' data-toggle='collapse' data-target='#collapseDetails'>Szczegóły</button><div class='collapse' id='collapseDetails'><br><div class='card card-body'>"+ error + "</div></div>",
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
    }
}

function loadTemplate()
{
    bootbox.confirm({
        message: "<form class='form'>\
                    <label>Wczytaj szablon</label>\
                    <div class='custom-file'>\
                        <input type='file' class='custom-file-input' id='inputFileTemplate' accept='.json'>\
                        <label class='custom-file-label' for='inputFileTemplate'>Wybierz plik</label>\
                    </div>\
                    <script>$('.custom-file-input').change(function (e) {var files = [];for (var i = 0; i < $(this)[0].files.length; i++) {files.push($(this)[0].files[i].name);}$(this).next('.custom-file-label').html(files.join(', '));});document.getElementById('inputFileTemplate').addEventListener('change', onChange);</script>\
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
                var nameTemplate = objectTemplate["nazwaSzablonu"]

                if(nameTemplate === "") 
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
                }else if(nameTemplate) 
                {
                    var patt = new RegExp(/^[\w\s\\u0000-~\u0080-þĀ-žƀ-ɎḀ-ỾⱠ-\u2c7e꜠-ꟾ]+$/);
                    var res = patt.test(nameTemplate);

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
                        if (/\s/.test(nameTemplate)) 
                        {
                            var nameID = nameTemplate.replace(/\s/g, "_");
                        }else
                        {
                            var nameID = nameTemplate;
                        }

                        var nameContainer = 'ux_' + nameID + '_div_' + countUX;

                        countUX++;

                        var newItemConfig = {
                            title: nameTemplate,
                            type: 'component',
                            componentName: 'ux',
                            componentState: { text: nameContainer }
                        };

                        if(myLayout.root.contentItems[0]==null)
                        {
                            myLayout.root.addChild(newItemConfig);
                        }
                        else if(myLayout.root.getItemsById('stos')[0]==null)
                        {
                            myLayout.root.contentItems[0].addChild(newItemConfig); 
                        }else
                        {
                            myLayout.root.getItemsById('stos')[0].addChild(newItemConfig); 
                        }

                        document.getElementById("btExport").classList.remove("disabled");
                        document.getElementById("btSaveTemplate").classList.remove("disabled");
                        document.getElementById("btSaveDocument").classList.remove("disabled");

                        addStructureTemplate(objectTemplate, nameContainer, nameTemplate);

                        var x = document.getElementsByClassName("gl_ux").length;
                        for(var i=0; i<x; i++)
                        {
                            document.getElementsByClassName("gl_ux")[i].parentNode.style.overflowY="scroll";
                        }

                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });   
}

function addStructureTemplate(nameFileTemplate, nameUxContainer, nameFile)
{
    var listStructure = document.createElement("ul");
    listStructure.classList.add('list-group','list-group-flush');

    var divList = document.createElement("div");
    divList.classList.add('ux-list-container');

    var listHeader = document.createElement("div");
    listHeader.classList.add('card-header','h3');
    listHeader.style.borderRadius="0px";
    listHeader.textContent=nameFile;

    var horizontalLine = document.createElement("hr");
    listHeader.appendChild(horizontalLine);

    addHeaderButtonGroup(listHeader);

    document.getElementById(nameUxContainer).appendChild(listHeader);

    var tabPoints = [];

    for (i in nameFileTemplate["kryteria"]) 
    {
        var namePoint = nameFileTemplate["kryteria"][i].nazwaPunktu;

        var pointList = document.createElement("li");
        pointList.style.borderRadius = "0px";  

        var contentPoint = document.createElement("p");
        contentPoint.classList.add('h5');

        pointList.classList.add('list-group-item');
        contentPoint.innerHTML=namePoint;

        pointList.appendChild(contentPoint);
        listStructure.appendChild(pointList);

        var idCollapseDiv = nameUxContainer+'_zwijany_'+i;

        addPointButtonGroup(pointList, idCollapseDiv);

        var structureSmallPoints = nameFileTemplate["kryteria"][i].podpunkty;

        tabPoints.push(addCollapseContent(pointList, namePoint, idCollapseDiv, structureSmallPoints)); 
    }

    if(listStructure.getElementsByTagName('li').length <= 0)
    {
        var referencebtnSaveAll = listHeader.getElementsByClassName('btn-warning')[0];
        referencebtnSaveAll.disabled = true;
    }

    var doc = new Dokument(nameFile, nameUxContainer , tabPoints);

    tabDocuments.push(doc);

    document.getElementById(nameUxContainer).appendChild(listStructure);
}

function loadDocument()
{
    bootbox.confirm({
        message: "<form class='form'>\
                    <label>Wczytaj dokument</label>\
                    <div class='custom-file'>\
                        <input type='file' class='custom-file-input' id='inputFileDocument' accept='.json'>\
                        <label class='custom-file-label' for='inputFileDocument'>Wybierz plik</label>\
                    </div>\
                    <script>$('.custom-file-input').change(function (e) {var files = [];for (var i = 0; i < $(this)[0].files.length; i++) {files.push($(this)[0].files[i].name);}$(this).next('.custom-file-label').html(files.join(', '));});document.getElementById('inputFileDocument').addEventListener('change', onChange);</script>\
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
                var nameDocument = objectTemplate["nazwaSzablonu"]

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
                        if (/\s/.test(nameDocument)) 
                        {
                            var nameID = nameDocument.replace(/\s/g, "_");
                        }else
                        {
                            var nameID = nameDocument;
                        }

                        var nameContainer = 'ux_' + nameID + '_div_' + countUX;

                        countUX++;

                        var newItemConfig = {
                            title: nameDocument,
                            type: 'component',
                            componentName: 'ux',
                            componentState: { text: nameContainer }
                        };

                        if(myLayout.root.contentItems[0]==null)
                        {
                            myLayout.root.addChild(newItemConfig);
                        }
                        else if(myLayout.root.getItemsById('stos')[0]==null)
                        {
                            myLayout.root.contentItems[0].addChild(newItemConfig); 
                        }else
                        {
                            myLayout.root.getItemsById('stos')[0].addChild(newItemConfig); 
                        }

                        document.getElementById("btExport").classList.remove("disabled");
                        document.getElementById("btSaveTemplate").classList.remove("disabled");
                        document.getElementById("btSaveDocument").classList.remove("disabled");

                        addStructureDocument(objectTemplate, nameContainer, nameDocument);

                        var x = document.getElementsByClassName("gl_ux").length;
                        for(var i=0; i<x; i++)
                        {
                            document.getElementsByClassName("gl_ux")[i].parentNode.style.overflowY="scroll";
                        }
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });   
}

function addStructureDocument(nameFileTemplate, nameUxContainer, nameFile)
{
    var listStructure = document.createElement("ul");
    listStructure.classList.add('list-group','list-group-flush');

    var divList = document.createElement("div");
    divList.classList.add('ux-list-container');

    var listHeader = document.createElement("div");
    listHeader.classList.add('card-header','h3');
    listHeader.style.borderRadius="0px";
    listHeader.textContent=nameFile;

    var horizontalLine = document.createElement("hr");
    listHeader.appendChild(horizontalLine);

    addHeaderButtonGroup(listHeader);

    document.getElementById(nameUxContainer).appendChild(listHeader);

    var tabPoints = [];

    for (i in nameFileTemplate["kryteria"]) 
    {
        var namePoint = nameFileTemplate["kryteria"][i].nazwaPunktu;

        var pointList = document.createElement("li");
        pointList.style.borderRadius = "0px";  

        var contentPoint = document.createElement("p");
        contentPoint.classList.add('h5');

        pointList.classList.add('list-group-item');
        contentPoint.innerHTML=namePoint;  

        pointList.appendChild(contentPoint);
        listStructure.appendChild(pointList);

        var idCollapseDiv = nameUxContainer+'_zwijany_'+i;

        addPointButtonGroup(pointList, idCollapseDiv);

        var structureSmallPoints = nameFileTemplate["kryteria"][i].podpunkty;

        var punkt = addCollapseContent(pointList, namePoint, idCollapseDiv, structureSmallPoints);

        punkt["notatki"].setContents(nameFileTemplate["kryteria"][i].edytor);

        tabPoints.push(punkt); 
    }

    if(listStructure.getElementsByTagName('li').length <= 0)
    {
        var referencebtnSaveAll = listHeader.getElementsByClassName('btn-warning')[0];
        referencebtnSaveAll.disabled = true;
    }    

    var doc = new Dokument(nameFile, nameUxContainer , tabPoints);

    tabDocuments.push(doc);

    document.getElementById(nameUxContainer).appendChild(listStructure);

    $('[data-toggle="tooltip"]').tooltip();
}

function loadNotepad()
{
    bootbox.confirm({
        message: "<form class='form'>\
                    <label>Wczytaj notatkę</label>\
                    <div class='custom-file'>\
                        <input type='file' class='custom-file-input' id='inputFileNotepad' accept='.json'>\
                        <label class='custom-file-label' for='inputFileNotepad'>Wybierz plik</label>\
                    </div>\
                    <script>$('.custom-file-input').change(function (e) {var files = [];for (var i = 0; i < $(this)[0].files.length; i++) {files.push($(this)[0].files[i].name);}$(this).next('.custom-file-label').html(files.join(', '));});document.getElementById('inputFileNotepad').addEventListener('change', onChange);</script>\
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
                var referenceQuill = showNotepadPage();
                referenceQuill.setContents(objectTemplate);
            }
        }
    });   
}